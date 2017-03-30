document.addEventListener('DOMContentLoaded', function () {
    const jsOnlyElements = document.getElementsByClassName('js-only');
    for (var i = 0; i < jsOnlyElements.length; ++i) {
        var element = jsOnlyElements.item(i);

        element.className = element.className.replace('js-only', '').trim();
    }
});
