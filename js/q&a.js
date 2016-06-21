$(function() {

    setup();
    addModals();

    function setup() {

        var $plugin_body = $( '<div class="plugin-body"></div>' );
        $plugin_body.append( '<h1>Learning Center Pages</h1>' );

        var $page_table = $('<div class="qa-tbl"></div>');

        var $table_header = $( '<div class="qa-tbl-row qa-tbl-hdr qa-stripe"></div>' );
        $table_header.append( '<div class="qa-page-id qa-center"><span>Page ID</span></div>' );
        $table_header.append( '<div class="qa-page-title"><span>Page Title</span></div>' );
        $table_header.append( '<div class="qa-page-q-count qa-center"><span>Question Count</span></div>' );
        $table_header.append( '<div class="qa-page-preview qa-center"><span>Preview</span></div>' );

        $page_table.append( $table_header );

        $page_table.append( getPageRows() );

        $plugin_body.append( $page_table );
        $( 'div#q-and-a-plugin' ).append( $plugin_body );
    }

    function getPageRows() {
        var $pageRows = $();
        for (var i = 0; i < pages.length; i++) {
            var page = pages[i];
            var $row = $( '<div class="qa-tbl-row qa-stripe page" data-p-id="' + page[0] + '" data-p-title="' + page[1] + '"></div>' );
            $row.append( '<div class="qa-page-id qa-center"><span>' + page[0] + '</span></div>' );
            $row.append( '<div class="qa-page-title"><span>' + page[1] + '</span></div>' );
            $row.append( '<div class="qa-page-q-count qa-center"><span> 0 </span></div>' );
            $row.append( '<div class="qa-page-preview qa-center"><button type="button" class="btn btn-success page-preview"><span class="glyphicon glyphicon-eye-open"></span><a href="' + page[2] + '" target="_blank" rel="noopener"></a></button></div>' );
            $pageRows = $pageRows.add($row);
        }
        return $pageRows;
    }

    function addModals() {
        $('div#q-and-a-plugin').append('<div id ="q-embed-preview-modal" class="modal"><div class="modal-content"><div class="modal-close"><span class="glyphicon glyphicon-remove"></span></div><div class="modal-header"><h1></h1></div><div class="modal-body"></div><div class="modal-footer"><div class="modal-footer-buttons"><button class="btn btn-default">Close</button><button class="btn btn-primary"><a rel="noopener" target="_blank">Preview</a></button><button class="btn btn-success">Save</button></div></div></div></div>');
        $('div#q-and-a-plugin').append('<div id ="q-add-edit-modal" class="modal"><div class="modal-content"><div class="modal-close"><span class="glyphicon glyphicon-remove"></span></div><div class="modal-header"><h1>New Question</h1></div><div class="modal-body"></div><div class="modal-footer"><div class="modal-footer-buttons"><button class="btn btn-default">Close</button><button class="btn btn-success create-question">Create</button></div></div></div></div>');
    }

    // stop click of the preview opening/closing a row
    $('button.page-preview').click(function(e) {
        e.stopPropagation();
    });

    $('div.qa-tbl-row.page').on('click', function() {
        var page_id = $(this).data('p-id');
        var page_title = $(this).data('p-title');

        // if the questions for this page are open
        if ($(this).next().hasClass('questions')) {
            $('div.questions, div.blank-row').slideUp(400, function() {
                $(this).remove();
            });
        } else {

            $('div.questions, div.blank-row').remove();

            var questions = $('<div class="questions"></div></div>')
            var questionTable = $('<div class="qst-table"></div>');
            questionTable.append('<div class="qa-tbl-row qa-tbl-hdr"><div class="q-name"><span>Question Name</span></div><div class="q-embed qa-center"><span>Embed</span></div>' +
                '<div class="q-edit qa-center"><span>Edit</span></div><div class="q-preview qa-center"><span>Preview</span></div>' +
                '<div class="q-delete qa-center"><span>Delete</span></div></div>');

            for (var i = 0; i < 5; i++) {
                var question = $('<div class="qa-tbl-row question"></div>');
                question.append('<div class="q-name"><span>How to use $(#my-element).after</span></div>');

                var embedButton = $('<div class="q-embed qa-center"><button type="button" class="btn btn-default"><span class="glyphicon glyphicon-link"></span></button></td>');

                embedButton.find('button').on('click', function() {
                    questionEmbedButtonClick(page_id, page_title, $(this).closest('div.questions').prev().find('.qa-page-preview a').attr('href'));
                });

                var editButton = $('<div class="q-edit qa-center"><button type="button" class="btn btn-primary"><span class="glyphicon glyphicon-pencil"></span></button></div>');

                editButton.find('button').on('click', function() {
                   questionEditButtonClick(); // and question_id
                });

                var previewButton = $('<div class="q-preview qa-center"><button type="button" class="btn btn-success"><span class="glyphicon glyphicon-eye-open"></span></button><div/>');

                previewButton.find('button').on('click', function() {
                   // questionPreviewButtonClick(page_id, page_title);
                });

                var deleteButton = $('<div  class="q-delete qa-center"><button type="button" class="btn btn-danger"><span class="glyphicon glyphicon-remove"></span></button></div>');

                deleteButton.find('button').on('click', function() {
                    questionDeleteButtonClick() // question_id
                });

                question.append(embedButton);
                question.append(editButton);
                question.append(previewButton);
                question.append(deleteButton);
                questionTable.append(question);
            }


            var addButton = $('<div class="qa-tbl-row question"><div class="q-add"><button type="button" class="btn btn-success"><span class="glyphicon glyphicon-plus"></span></button></div>');

            addButton.find('button').on('click', function() {
               addQuestionButtonClick(page_id);
            });

            questionTable.append(addButton);
            var blankSpace = $('<div class="qa-tbl-row blank-row"></div>');
            $(this).after(questions);
            questions.append(questionTable).after(blankSpace);
            blankSpace.height(questions.height());
            questions.add(blankSpace).hide().slideDown(600);
        }
    });



    $('div.modal-close, .modal, div.modal-footer .btn-default').on('click', function() {
        if(!getSelection().toString()){
            $('div.modal').fadeOut(300);
            $('body').css('overflow','auto');
        }

    });

    // stop modal overlay close event
    $('div.modal-content').on('click', function(e) {
        e.stopPropagation();
    });

    function questionEmbedButtonClick(page_id, page_title, preview_link) {
        var data = {
            action: 'embed_question',
            page_id: page_id
        };

        $.ajax({
            type: "post",
            dataType: "json",
            url: wp_ajax.ajax_url,
            data: data
        })
        .done(function(data) {
            console.log( "success - get edit page" );
        })
        .fail(function() {
            console.log( "error - get edit page" );
        })
        .always(function(data) {
            console.log('always - get edit page');
            console.log(data);
            
            $('div#q-embed-preview-modal').data('p-id', page_id);
            $('div#q-embed-preview-modal').data('p-title', page_title);
            $('div#q-embed-preview-modal div.modal-footer button.btn-primary>a').attr('href', preview_link);
            $('div#q-embed-preview-modal').fadeIn(600);
            $('body').css('overflow','hidden');
            $('div#q-embed-preview-modal div.modal-header>h1').text(page_title + ': <iframe src="http://www.example.com"></iframe>');
            $('div#q-embed-preview-modal div.modal-body').empty().append(data.responseText);
            resizeModalBody('q-embed-preview-modal');
        });
    }

    function questionEditButtonClick() { // question id
        // TO DO
    }

    // function questionPreviewButtonClick() {
    //     // TO DO - probably just an <a> link
    // }

    function questionDeleteButtonClick() { // question id
        // TO DO
    }

    function addQuestionButtonClick(page_id) {
        $('div#q-add-edit-modal').data('p-id', page_id);
        var modal_body = $('div#q-add-edit-modal .modal-body');
        modal_body.empty();

        var question_form = $('<form></form>');

        var question_name = $('<fieldset class="form-group"> <label for="q-name-input">Question Name </label> <input type="text" id="q-name-input" class="form-control" placeholder="Question Name"></fieldset>');

        var question_type = $('<fieldset class="form-group"> <label for="q-type-select">Question Type </label></fieldset>');

        var type_select = $('<select class="form-control" id="q-type-select"><option>Multiple Choice Text</option>' +
            '<option>Bug Fix</option><option>Missing Code</option><option>Complete Code</option></select>');

        question_type.append(type_select);


        var question_statement = $('<fieldset class="form-group"> <label for="q-statement-input">Question Statement</label><textarea class="form-control" id="q-statement-input" rows="3"></textarea></fieldset>');

        var type_area = $('<div class="question-type-area multiple-choice-text"></div>');

        $(type_select).on('change', function() {
            type_area.html(questionTypeChange(type_select.find('option:selected').text()));
            if (type_select.find('option:selected').text() != 'Multiple Choice Text') {
                var editor = ace.edit('editor');
                editor.setTheme('ace/theme/monokai');
                editor.getSession().setMode("ace/mode/javascript");
            }
        });

        question_form.append(question_name.add(question_type).add(question_statement));
        type_area.html(questionTypeChange(type_select.find('option:selected').text()));
        question_form.append(type_area);

        var hints = $('<fieldset class="form-group hints"> <label>Hints </label></fieldset>');
        var hint_button_1 = $('<button type="button" class="btn btn-default hint hint-1 active" data-hint="1"><span>Hint 1</span></button>');

        var hint_button_2 = $('<button type="button" class="btn btn-default hint hint-2" data-hint="2"><span>2</span></button>');

        var hint_button_3 = $('<button type="button" class="btn btn-default hint hint-3" data-hint="3"><span>3</span></button>');

        var hint_textarea = $('<textarea class="form-control" id="q-statement-input" rows="3" placeholder="Hint 1"></textarea>');

        hints.append(hint_button_1);
        hints.append(hint_button_2);
        hints.append(hint_button_3);
        hints.append(hint_textarea);

        hint_button_1.add(hint_button_2).add(hint_button_3).on('click', function() {
            var button = $(this);
            if (! button.hasClass('active')) {
                button.find('span').text('Hint ' + button.data('hint'));
                $('fieldset.hints button.hint.active').data('hint-text', $('fieldset.hints textarea').val());
                $('fieldset.hints textarea').val(button.data('hint-text'));
                $('fieldset.hints textarea').attr('placeholder', 'Hint ' + button.data('hint'));
                $('button.hint.active>span').text($('button.hint.active').data('hint'));
                $('button.hint.active').removeClass('active');
                button.addClass('active');
                $('fieldset.hints textarea').focus();
            }
        });

        hint_textarea.on('keyup', function() {
            $('button.hint.active').data('hint-text', $(this).val());
        });

        question_form.append(hints);

        modal_body.append(question_form);

        $('div#q-add-edit-modal').fadeIn(600);
        $('body').css('overflow','hidden');
        resizeModalBody('q-add-edit-modal');
    }

    // probably better to operate on the option text (if order changes)
    function questionTypeChange(type) {
        switch (type) {
            case 'Multiple Choice Text':
                $('div.question-type-area').attr('class', 'question-type-area multiple-choice-text');

                var add_remove_options = $('<fieldset class="form-group mc-option-change"></fieldset>');

                var add_option = $('<button type="button" class="btn btn-default mc-add-option"><span class="glyphicon glyphicon-plus"></span></button>');

                add_option.on('click', function() {
                    $('fieldset.mc-text-option').last().after(createMultipleChoiceOptions(1));
                });

                var remove_option = $('<button type="button" class="btn btn-default mc-remove-option"><span class="glyphicon glyphicon-minus"></span></button>');

                remove_option.on('click', function() {
                    if ($('fieldset.mc-text-option').length > 2) {
                        $('fieldset.mc-text-option').last().remove();
                    }
                });

                add_remove_options.append(remove_option.add(add_option));

                return add_remove_options.add(createMultipleChoiceOptions(4)); // default create 4 options

                break;
            default:
                $('div.question-type-area').attr('class', 'question-type-area coding');
                var editor = $('<div id="editor" class="code-editor mc-code">// Enter your code here</div>');

                var io = $('<fieldset class="form-group input-output"> <label>Input / Output </label></fieldset>');
                var io_1 = $('<button type="button" class="btn btn-default io io-1 active" data-io="1"><span>IO 1</span></button>');

                var io_2 = $('<button type="button" class="btn btn-default io io-2" data-io="2"><span>2</span></button>');

                var io_3 = $('<button type="button" class="btn btn-default io io-3" data-io="3"><span>3</span></button>');

                var add_io = $('<button type="button" class="btn btn-default io io-3" data-io="3"><span>3</span></button>');

                var input_textarea = $('<textarea class="form-control" id="input_textarea" rows="3" placeholder="Question Input 1"></textarea>');
                var output_input = $('<input type="text" id="output-input" class="form-control" placeholder="Expected Output 1">');

                io.append(io_1);
                io.append(io_2);
                io.append(io_3);
                io.append(input_textarea);
                io.append(output_input);

                io_1.add(io_2).add(io_3).on('click', function() {
                    ioButtonClick($(this));
                });

                input_textarea.on('keyup', function() {
                    $('button.io.active').data('input', $(this).val());
                });

                output_input.on('keyup', function() {
                    $('button.io.active').data('output', $(this).val());
                });

                return editor.add(io);
                break;
        }
    }

    $('div.modal button.create-question').on('click', function() {
        var q_name = $('#q-name-input').val();
        var q_type = $('#q-type-select').find('option:selected').text();
        var q_statement = $('#q-statement-input').val();
        if (q_type != 'Multiple Choice Text') {
            var editor = ace.edit('editor');
            var q_code = editor.getValue();

            console.log('q code: ' + q_code);
        }

        console.log('q_name: ' + q_name);
        console.log('q_type: ' + q_type);
        console.log('q_statement: ' + q_statement);
        // e.stopPropagation();
        console.log('success');
    });


    function ioButtonClick(button) {
        console.log('teest');
        if (! button.hasClass('active')) {
            button.find('span').text('IO ' + button.data('io'));
            $('fieldset.input-output button.io.active').data('input', $('fieldset.input-output textarea').val());
            $('fieldset.input-output button.io.active').data('output', $('fieldset.input-output input').val());
            $('fieldset.input-output textarea').val(button.data('input'));
            $('fieldset.input-output input').val(button.data('output'));
            $('fieldset.input-output textarea').attr('placeholder', 'Question Input ' + button.data('io'));
            $('fieldset.input-output input').attr('placeholder', 'Expected Output ' + button.data('io'));
            $('button.io.active>span').text($('button.io.active').data('io'));
            $('button.io.active').removeClass('active');
            button.addClass('active');
            $('fieldset.input-output textarea').focus();
        }
    }

    function createMultipleChoiceOptions(n) {
        var r = $('');
        for (var i = 0; i < n; i++) {

            var option = $('<fieldset class="form-group mc-text-option"><div class="input-group input"><input type="text" class="form-control wrong" id="q-mc-option-' + i + '" placeholder="Option ' + ((i + 1) + $('.mc-text-option').length) + ' Text">' +
                '<div class="input-group-addon correct-answer"></div></div></div></fieldset>');

            var correct_button = $('<button type="button" class="btn btn-default mc-correct-answer"><span class="glyphicon glyphicon-ok"></span></button>');

            correct_button.on('click', function() {
                var input = $(this).closest('.input-group').find('input');

                if (input.hasClass('wrong')) {
                    input.removeClass('wrong').addClass('correct');
                    $(this).addClass('btn-success').removeClass('btn-default');
                }
                else {
                    input.removeClass('correct').addClass('wrong');

                    $(this).removeClass('btn-success').addClass('btn-default');
                }
            });

            option.find('.correct-answer').append(correct_button);

            r = r.add(option);
        }

        return r;
    }

    $(window).on('resize', function() {
        if ($('.modal:visible').length) {
            resizeModalBody($('.modal:visible').attr('id'));
        }
    });

    function resizeModalBody(modal_id) {
        var modal_height = $('div#' + modal_id + ' div.modal-content').height();
        var modal_header_height = $('div#' + modal_id + ' div.modal-header').outerHeight(true);
        var modal_footer_height = $('div#' + modal_id + ' div.modal-footer').outerHeight(true);

        $('div#' + modal_id + ' div.modal-body').height(modal_height - (modal_header_height + modal_footer_height));
    }

    $('div#q-embed-preview-modal button.btn-success').on('click', function() {
        var page_id = $('div#q-embed-preview-modal').data('p-id');
        var page_title = $('div#q-embed-preview-modal').data('p-title');
        var page_content = $('div#q-embed-preview-modal textarea.wp-editor-area').val();

        var data = {
            action: 'update_page',
            page_id: page_id,
            page_content: page_content
        };

        $.ajax({
            type: "post",
            dataType: "json",
            url: wp_ajax.ajax_url,
            data: data
        })
        .done(function(data) {
            console.log( "success - update page" );
        })
        .fail(function() {
            console.log( "error - update page" );
        })
        .always(function(data) {
            console.log('always - update page');
            console.log(data);
            var $message = $('<div class="modal-message-overlay"><div class="modal-message-content"><h2>The ' + page_title +  ' page has been updated successfully!</h2></div></div>');

            $('div#q-embed-preview-modal .modal-content').append($message);
            $message.hide().fadeIn(600, function() { setTimeout(function() { $message.fadeOut(800, function() { $message.remove(); }) }, 2200) });
        });
    });


});
