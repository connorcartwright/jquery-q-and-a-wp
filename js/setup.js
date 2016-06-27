
    setup();

    function setup() {
        var $plugin_body = $('<div class="plugin-body"></div>');
        $plugin_body.append('<h1>Learning Center Pages</h1>');
        $plugin_body.append(createPageTable());
        $('div#q-and-a-plugin').append($plugin_body);
        $('div#q-and-a-plugin').append(createModal());
    }

    function createModal() {
        return $('<div class="modal"><div class="modal-overlay"></div><div class="modal-content"><div class="modal-close"><span class="glyphicon glyphicon-remove"></span></div><div class="modal-header"><h1></h1></div><div class="modal-body"></div><div class="modal-footer"><div class="modal-footer-buttons"><button class="btn btn-default close-modal">Close</button><button class="btn btn-success">Save</button></div></div></div></div>');
    }

    function createPageTable() {
        var $page_table = $('<div class="qa-tbl"></div>');
        var $table_header = $('<div class="qa-tbl-row qa-tbl-hdr qa-stripe"></div>');
        $table_header.append('<div class="qa-page-id qa-center"><span>Page ID</span></div>');
        $table_header.append('<div class="qa-page-title"><span>Page Title</span></div>');
        $table_header.append('<div class="qa-page-q-count qa-center"><span>Question Count</span></div>');
        $table_header.append('<div class="qa-page-preview qa-center"><span>Preview</span></div>');
        $page_table.append($table_header);

        for (var i = 0; i < pages.length; i++) {
            var page = pages[i];
            var $row = $('<div class="qa-tbl-row qa-stripe page" data-p-id="' + page[0] + '" data-p-title="' + page[1] + '"></div>');
            $row.append('<div class="qa-page-id qa-center"><span>' + page[0] + '</span></div>');
            $row.append('<div class="qa-page-title"><span>' + page[1] + '</span></div>');
            $row.append('<div class="qa-page-q-count qa-center"><span> 0 </span></div>');
            $row.append('<div class="qa-page-preview qa-center"><button type="button" class="btn btn-success page-preview"><span class="glyphicon glyphicon-eye-open"></span><a href="' + page[2] + '" target="_blank" rel="noopener"></a></button></div>');
            $page_table.append($row);
        }

        return $page_table;
    }

    // stop click of the preview opening/closing a row
    $('button.page-preview').click(function(e) {
        e.stopPropagation();
    });

    $('div#q-and-a-plugin').on('click', 'div.qa-tbl-row.page', function() {
        pageRowClick($(this), $(this).data('p-id'), $(this).data('p-title'));
    });

    function pageRowClick(row, page_id, page_title) {
        // if the questions for this page are open
        if ($(row).next().hasClass('questions')) {
            $('div.questions, div.blank-row').slideUp(400, function () {
                $(row).next().remove();
            });
        } else {
            $('div.questions, div.blank-row').remove();

            var questions = $('<div class="questions" data-p-id="' + page_id + '" data-p-title="' + page_title + '"></div></div>');
            var questionTable = $('<div class="qst-table"></div>');
            questionTable.append('<div class="qa-tbl-row qa-tbl-hdr"><div class="q-name"><span>Question Name</span></div><div class="q-embed qa-center"><span>Embed</span></div>' +
                '<div class="q-edit qa-center"><span>Edit</span></div><div class="q-preview qa-center"><span>Preview</span></div>' +
                '<div class="q-delete qa-center"><span>Delete</span></div></div>');

            for (var i = 0; i < 5; i++) {
                var question = $('<div class="qa-tbl-row question"></div>');
                question.append('<div class="q-name"><span>How to use $(#my-element).after</span></div>');

                var embedButton = $('<div class="q-embed qa-center"><button type="button" class="btn btn-default"><span class="glyphicon glyphicon-link"></span></button></td>');

                var editButton = $('<div class="q-edit qa-center"><button type="button" class="btn btn-primary"><span class="glyphicon glyphicon-pencil"></span></button></div>');

                var previewButton = $('<div class="q-preview qa-center"><button type="button" class="btn btn-success"><span class="glyphicon glyphicon-eye-open"></span></button><div/>');

                var deleteButton = $('<div  class="q-delete qa-center"><button type="button" class="btn btn-danger"><span class="glyphicon glyphicon-remove"></span></button></div>');

                question.append(embedButton);
                question.append(editButton);
                question.append(previewButton);
                question.append(deleteButton);
                questionTable.append(question);
            }


            var addButton = $('<div class="qa-tbl-row question"><div class="q-add"><button type="button" class="btn btn-success"><span class="glyphicon glyphicon-plus"></span></button></div>');


            questionTable.append(addButton);
            var blankSpace = $('<div class="qa-tbl-row blank-row"></div>');
            $(row).after(questions);
            questions.append(questionTable).after(blankSpace);
            blankSpace.height(questions.height());
            questions.add(blankSpace).hide().slideDown(600);
        }
    }

    // $('div#q-and-a-plugin').on('click', 'div.q-delete>button', function() {
    //     questionDeleteButtonClick(); // question_id
    // });