'use strict';

document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('picture-presentation-container')) {
        const showButton = document.getElementById('show-qr');

        if (showButton) {
            showButton.addEventListener('click', function () {
                const container = document.getElementById('qr-container');
                const image = document.getElementById('qr-image');

                if (container && image) {
                    const condition = container.offsetHeight === 0;

                    container.style.height = (condition ? image.height : 0) + 'px';

                    showButton.innerText = condition ? 'Hide QR Code' : 'Show QR Code';
                }
            });
        }

        const editButton = document.getElementById('edit');

        if (editButton) {
            editButton.addEventListener('click', function () {
                const editContainer = document.getElementById('picture-presentation-edit-container');

                if (editContainer) {
                    editContainer.className = editContainer.className.replace('hidden', '').trim();

                    const editBox = document.getElementById('edit-box');

                    if (editBox) {
                        editBox.style.top = ((editContainer.clientHeight - editBox.clientHeight) / 2) + 'px';
                    }
                }
            });
        }
        
        const closeButton = document.getElementById('close');
        
        if (closeButton) {
            closeButton.addEventListener('click', function () {
                const editContainer = document.getElementById('picture-presentation-edit-container');

                if (editContainer) {
                    const classes = editContainer.className.split(' ');
                    classes.push('hidden');

                    editContainer.className = classes.join(' ');
                }
            });
        }

        const deleteButton = document.getElementById('delete');

        if (deleteButton) {
            deleteButton.addEventListener('click', function () {
                const xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (this.readyState === 4) {
                        const response = JSON.parse(xhttp.responseText);

                        var class_part;

                        if (this.status === 200) {
                            const classes = deleteButton.className.split(' ');
                            classes.push('hidden');

                            deleteButton.className = classes.join(' ');

                            class_part = response.success ? 'success' : 'danger';
                        } else {
                            class_part = 'danger';
                        }

                        const alert_element = deleteButton.parentElement.querySelector('.alert-' + class_part);
                        alert_element.className = alert_element.className.replace('hidden', '').trim();
                        alert_element.innerText = response.message;
                    }
                };
                xhttp.open('post', window.location.pathname.replace('\/p\/', '\/d\/'), true);
                xhttp.send();
            });
        }
    }

    const editContainer = document.getElementById('picture-presentation-edit-container');

    if (editContainer) {
        const editBox = document.getElementById('edit-box');

        if (editBox) {
            window.addEventListener('resize', function () {
                editBox.style.top = ((editContainer.clientHeight - editBox.clientHeight) / 2) + 'px';
            });
        }
    }
});
