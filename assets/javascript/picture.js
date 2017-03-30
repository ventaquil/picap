document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('picture-presentation-container')) {
        var showButton = document.getElementById('show-qr');

        if (showButton) {
            showButton.addEventListener('click', function () {
                var container = document.getElementById('qr-container');
                var image = document.getElementById('qr-image');

                if (container && image) {
                    var condition = container.offsetHeight === 0;

                    container.style.height = (condition ? image.height : 0) + 'px';

                    showButton.innerText = condition ? 'Hide QR Code' : 'Show QR Code';
                }
            });
        }
    }
});
