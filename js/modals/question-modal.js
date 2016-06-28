$(function() {

    "use strict";

    $('#q-and-a-plugin').on('click', '.q-edit>button', function () {
        editQuestionButtonClick($(this).closest('.questions').data('p-id'));
    });

    $('#q-and-a-plugin').on('click', '.q-add>button', function () {
        addQuestionButtonClick($(this).closest('.questions').data('p-id'));
    });

    // $('#q-and-a-plugin').on('click', '.q-preview>button', function() {
    //     var row = $(this).closest('.questions');
    //     questionPreviewButtonClick(row.data('p-id'), row.data('p-title'));
    // });

    function editQuestionButtonClick(page_id) { // needs question id
        $('.modal')
            .data('p-id', page_id)
            .addClass('question')
            .find('.modal-footer button.btn-success')
                .addClass('edit-question')
                .removeClass('create-question');
    }

    function addQuestionButtonClick(page_id) {
        var modal = $('.modal');
        modal
            .data('p-id', page_id)
            .addClass('question')
            .find('.modal-header h1')
                .text('Add Question')
            .end()
            .find('.modal-footer button.btn-success')
                .addClass('create-question')
                .removeClass('edit-question')
                .text('Create');

        var modal_body = modal.find('.modal-body');
        modal_body.empty();

        var question_form = $('<form></form>');
        var question_name = $('<fieldset class="form-group"> <label for="q-name-input">Question Name </label> <input type="text" id="q-name-input" class="form-control" placeholder="Question Name"></fieldset>');
        var question_type = $('<fieldset class="form-group"> <label for="q-type-select">Question Type </label></fieldset>');
        var question_statement = $('<fieldset class="form-group"> <label for="q-statement-input">Question Statement</label><textarea class="form-control" id="q-statement-input" rows="3" placeholder="Question Statement"></textarea></fieldset>');

        var type_select = $('<select class="form-control" id="q-type-select"><option>Multiple Choice</option><option>Bug Fix</option><option>Missing Code</option><option>Complete Code</option></select>');
        var question_type_area = $('<div class="question-type-area multiple-choice"></div>');
        question_type_area.html(questionTypeChange(type_select.find('option:selected').text()));

        $(type_select).on('change', function () {
            var type = type_select.find('option:selected').text();
            question_type_area.html(questionTypeChange(type));
            if (type != 'Multiple Choice') {
                var editor = ace.edit('editor');
                editor.setTheme('ace/theme/monokai');
                editor.getSession().setMode("ace/mode/javascript");
            }
        });

        question_type.append(type_select);
        question_form
            .append(question_name)
            .append(question_type)
            .append(question_statement)
            .append(question_type_area)
            .append(createHints());

        modal_body.append(question_form);

        modal.fadeIn(600);
        $('body').css('overflow', 'hidden');
        resizeModalBody();
    }

    function createHints() {
        var $hints = $('<fieldset class="form-group hints"> <label>Hints </label></fieldset>');
        var hint_button_1 = '<button type="button" class="btn btn-default hint hint-1 active" data-hint="1"><span>Hint 1</span></button>';
        var hint_button_2 = '<button type="button" class="btn btn-default hint hint-2" data-hint="2"><span>2</span></button>';
        var hint_button_3 = '<button type="button" class="btn btn-default hint hint-3" data-hint="3"><span>3</span></button>';
        var $hint_textarea = $('<textarea class="form-control" id="q-statement-input" rows="3" placeholder="Hint 1"></textarea>');

        $hints
            .append(hint_button_1)
            .append(hint_button_2)
            .append(hint_button_3)
            .append($hint_textarea);

        $hint_textarea.on('keyup', function () {
            $('button.hint.active').data('hint-text', $(this).val());
        });

        $('.modal').on('click', 'button.hint', function () {
            hintButtonClick($(this));
        });

        return $hints;
    }

    function hintButtonClick(button) {
        if (!button.hasClass('active')) {
            button.find('span').text('Hint ' + button.data('hint'));
            $('fieldset.hints button.hint.active').data('hint-text', $('fieldset.hints textarea').val());
            $('fieldset.hints textarea').val(button.data('hint-text'));
            $('fieldset.hints textarea').attr('placeholder', 'Hint ' + button.data('hint'));
            $('button.hint.active>span').text($('button.hint.active').data('hint'));
            $('button.hint.active').removeClass('active');
            button.addClass('active');
            $('fieldset.hints textarea').focus();
        }
    }

    function questionTypeChange(type) {
        $('.modal *').removeClass('error');
        switch (type) {
            case 'Multiple Choice':
                return createMultipleChoiceArea();
            default:
                return createCodeArea();
        }
    }

    function createMultipleChoiceArea() {
        $('.question-type-area').attr('class', 'question-type-area multiple-choice');

        var add_remove_options = $('<fieldset class="form-group mc-option-change">' +
            '<button type="button" class="btn btn-default mc-remove-option"><span class="glyphicon glyphicon-minus"></span></button>' +
            '<button type="button" class="btn btn-default mc-add-option"><span class="glyphicon glyphicon-plus"></span></button></fieldset>');
        return add_remove_options.add(createMultipleChoiceOptions(4));
    }

    bindMultipleChoiceEvents();
    function bindMultipleChoiceEvents() {
        $('#q-and-a-plugin').on('click', '.mc-add-option', function () {
            $('fieldset.mc-text-option').last().after(createMultipleChoiceOptions(1));
        });

        $('#q-and-a-plugin').on('click', '.mc-remove-option', function () {
            if ($('.mc-text-option').length > 2) {
                $('.mc-text-option').last().remove();
            }
        });

        $('#q-and-a-plugin').on('click', '.correct-answer', function () {
            correctButtonClick($(this));
        });
    }

    function correctButtonClick(button) {
        var input = button.closest('.input-group').find('input');

        if (input.hasClass('wrong')) {
            input.removeClass('wrong').addClass('correct');
            button.addClass('btn-success').removeClass('btn-default');
        }
        else {
            input.removeClass('correct').addClass('wrong');

            button.removeClass('btn-success').addClass('btn-default');
        }
    }

    function createMultipleChoiceOptions(n) {
        var r = $('');
        for (var i = 0; i < n; i++) {

            var option = $('<fieldset class="form-group mc-text-option"><div class="input-group input"><input type="text" class="form-control wrong" id="q-mc-option-' + i + '" placeholder="Option ' + ((i + 1) + $('.mc-text-option').length) + ' Text">' +
                '<div class="input-group-addon correct-answer"></div></div></div></fieldset>');

            var correct_button = $('<button type="button" class="btn btn-default mc-correct-answer"><span class="glyphicon glyphicon-ok"></span></button>');

            option.find('.correct-answer').append(correct_button);

            r = r.add(option);
        }

        return r;
    }

    function createCodeArea() {
        var editor = $('<div id="editor" class="code-editor mc-code">// Enter your code here</div>');
        var io = $('<fieldset class="form-group input-output"> <label>Input / Output </label></fieldset>');
        var remove_io = $('<button type="button" class="btn btn-default remove-io"><span class="glyphicon glyphicon-minus"></span></button>');
        var add_io = $('<button type="button" class="btn btn-default add-io"><span class="glyphicon glyphicon-plus"></span></button>');
        var io_1 = $('<button type="button" class="btn btn-default io active" data-io="1"><span>IO 1</span></button>');
        var io_2 = $('<button type="button" class="btn btn-default io" data-io="2"><span>2</span></button>');
        var io_3 = $('<button type="button" class="btn btn-default io" data-io="3"><span>3</span></button>');

        remove_io.on('click', function () {
            if ($('button.io').length > 3) {
                $('button.io').last().remove();
            }
        });

        add_io.on('click', function () {
            var io_length = $('button.io').length;
            if (io_length < 8) {
                var io_count = ($('button.io').length + 1);
                var new_io = $('<button type="button" class="btn btn-default io" data-io="' + io_count + '"><span>' + io_count + '</span></button>');
                $('button.io').last().after(new_io);
            }
        });

        var input_textarea = $('<textarea class="form-control" id="input_textarea" rows="3" placeholder="Question Input 1"></textarea>');
        var output_input = $('<input type="text" id="output-input" class="form-control" placeholder="Expected Output 1">');

        io.append(remove_io);
        io.append(add_io);
        io.append(io_1);
        io.append(io_2);
        io.append(io_3);
        io.append(input_textarea);
        io.append(output_input);

        $('.modal').on('click', 'button.io', function () {
            ioButtonClick($(this));
        });

        input_textarea.on('keyup', function () {
            $('button.io.active').data('input', $(this).val());
        });

        output_input.on('keyup', function () {
            $('button.io.active').data('output', $(this).val());
        });

        return editor.add(io);
    }

    function ioButtonClick(button) {
        if (!button.hasClass('active')) {
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

    $('.modal').on('click', ' button.create-question', function () {
        $('.modal *').removeClass('error');
        $('.modal .error-text').remove();
        var q_name = $('#q-name-input');

        if (q_name.val().length < 10) {
            q_name.addClass('error');
        }

        var q_statement = $('#q-statement-input');

        if (q_statement.val().length < 50) {
            q_statement.addClass('error');
        }

        var q_type = $('#q-type-select').find('option:selected').text();

        var q_code;

        if (q_type == 'Multiple Choice') {
            var option_count = $('.mc-text-option').length;
            if (!$('.mc-text-option .form-control.wrong').length) {
                $('.mc-option-change').after('<span class="error-text">There must be at least one wrong answer!</span>');
            }
            else if ($('.mc-text-option .form-control.wrong').length == option_count) {
                $('.mc-option-change').after('<span class="error-text">There must be at least one correct answer!</span>');
            }
        }
        else {
            q_code = ace.edit('editor').getValue();

            $('button.io').each(function () {
                if (!$(this).data('input') || !$(this).data('output')) {
                    $(this).addClass('error');
                }
            });
        }

        $('button.hint').each(function () {
            if ($(this).data('hint-text')) {
                if ($(this).data('hint-text').length < 20) {
                    $(this).addClass('error');
                }
            }
            else {
                $(this).addClass('error');
            }
        });

        console.log('q_name: ' + q_name);
        console.log('q_type: ' + q_type);
        console.log('q_statement: ' + q_statement);
        console.log('q_code: ' + q_code);
        console.log('success');
    });

});
