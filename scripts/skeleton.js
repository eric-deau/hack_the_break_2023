function loadSkeleton() {
    console.log($('#navbarPlaceholder').load('./text/nav.html'));
    console.log($('#mapPlaceholder').load('./text/map.html'));
    console.log($('#footerBeforeLoginPlaceholder').load('./text/footer_before_login.html'));
    console.log($('#footerAfterLoginPlaceholder').load('./text/footer_after_login.html'));
    console.log($('#reportPlaceholder').load('./text/submission.html'));
}
loadSkeleton();
