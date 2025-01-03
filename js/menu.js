$(document).ready(function() {
    // Toggle sidebar
    $('#sidebarToggle').click(function() {
        console.log('Sidebar toggle clicked'); // Log to confirm click event
        $('#sidebar').toggleClass('active');
        $('#content').toggleClass('full-width');
    });

    // Hide sidebar when clicking outside of it
    $(document).click(function(event) {
        if (!$(event.target).closest('#sidebar, #sidebarToggle').length) {
            if ($('#sidebar').hasClass('active')) {
                $('#sidebar').removeClass('active');
                $('#content').removeClass('full-width');
            }
        }
    });

    // Fetch content.json and setup filters
    $.getJSON('content.json', function(data) {
        displayLabs(data);

        // Filter labs on category or center change
        $('#categoryFilter, #centerFilter').change(function() {
            const category = $('#categoryFilter').val();
            const center = $('#centerFilter').val();
            displayLabs(data, category, center);
        });
    });

    function displayLabs(data, category = '', center = '') {
        let filteredData = data;

        if (category) {
            filteredData = filteredData.filter(lab => lab.Categoría === category);
        }

        if (center) {
            filteredData = filteredData.filter(lab => lab.Centro === center);
        }

        const labsList = $('#labsList');
        labsList.empty();

        if (filteredData.length > 0) {
            filteredData.forEach(lab => {
                const labElement = `
                    <div class="col-12 mb-3">
                        <div class="card lab-card" data-bs-toggle="modal" data-bs-target="#labModal">
                            <div class="card-body">
                                <h5 class="card-title">${lab["Nombre del Lab"]}</h5>
                                <p class="card-text">
                                    <strong>Categoría:</strong> ${lab.Categoría} <br>
                                    <strong>Centro:</strong> ${lab.Centro}
                                </p>
                            </div>
                        </div>
                    </div>
                `;
                labsList.append(labElement);
            });

            // Make lab cards clickable
            $('.lab-card').click(function() {
                $('#labModal').modal('show');
            });
        } else {
            labsList.append('<div class="col-12"><p>No se encontaron laboratorios.</p></div>');
        }
    }
});
