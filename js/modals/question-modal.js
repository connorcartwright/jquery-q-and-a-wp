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
            .find('.modal-footer .btn-success')
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
            .find('.modal-footer .btn-success')
                .addClass('create-question')
                .removeClass('edit-question')
                .text('Create');

        var modalBody = modal.find('.modal-body');
        modalBody.empty();

        var questionForm = $('<form></form>');
        var questionName = $('<fieldset class="form-group"> <label for="q-name-input">Question Name </label> <input type="text" id="q-name-input" class="form-control" placeholder="Question Name"></fieldset>');
        var questionType = $('<fieldset class="form-group"> <label for="q-type-select">Question Type </label></fieldset>');
        var questionStatement = $('<fieldset class="form-group"> <label for="q-statement-input">Question Statement</label><textarea class="form-control" id="q-statement-input" rows="3" placeholder="Question Statement"></textarea></fieldset>');

        var typeSelect = $('<select class="form-control" id="q-type-select"><option>Multiple Choice</option><option>Bug Fix</option><option>Missing Code</option><option>Complete Code</option></select>');
        var questionTypeArea = $('<div class="question-type-area multiple-choice"></div>');
        questionTypeArea.html(questionTypeChange(typeSelect.find('option:selected').text()));

        $(typeSelect).on('change', function () {
            var type = typeSelect.find('option:selected').text();

                // if type wasn't already MC, AND the area isn't already coding
            console.log($('.question-type-area.coding').length);

                if (type == 'Multiple Choice') {
                    questionTypeArea.html(questionTypeChange(type));
                } else if (!$('.question-type-area.coding').length) {
                    questionTypeArea.html(questionTypeChange(type));
                    var editor = ace.edit('editor');
                    editor.setTheme('ace/theme/monokai');
                    editor.getSession().setMode("ace/mode/javascript");
                }
        });

        questionType.append(typeSelect);
        questionForm
            .append(questionName)
            .append(questionType)
            .append(questionStatement)
            .append(questionTypeArea)
            .append(createHints());

        modalBody.append(questionForm);

        modal.fadeIn(600);
        $('body').css('overflow', 'hidden');
        resizeModalBody();
    }

    function createHints() {
        var $hints = $('<fieldset class="form-group hints"> <label>Hints </label></fieldset>');
        var hintButton1 = '<button type="button" class="btn btn-default hint hint-1 active" data-hint="1"><span>Hint 1</span></button>';
        var hintButton2 = '<button type="button" class="btn btn-default hint hint-2" data-hint="2"><span>2</span></button>';
        var hintButton3 = '<button type="button" class="btn btn-default hint hint-3" data-hint="3"><span>3</span></button>';
        var $hintTextarea = $('<textarea class="form-control" id="q-statement-input" rows="3" placeholder="Hint 1"></textarea>');

        $hints
            .append(hintButton1)
            .append(hintButton2)
            .append(hintButton3)
            .append($hintTextarea);

        $hintTextarea.on('keyup', function () {
            $('.hint.active').data('hint-text', $(this).val());
        });

        $('.modal').on('click', '.hint', function () {
            hintButtonClick($(this));
        });

        return $hints;
    }

    function hintButtonClick(button) {
        if (!button.hasClass('active')) {
            button.find('span').text('Hint ' + button.data('hint'));
            $('fieldset.hints .hint.active').data('hint-text', $('fieldset.hints textarea').val());
            $('fieldset.hints textarea').val(button.data('hint-text'));
            $('fieldset.hints textarea').attr('placeholder', 'Hint ' + button.data('hint'));
            $('.hint.active>span').text($('.hint.active').data('hint'));
            $('.hint.active').removeClass('active');
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

        var addRemoveOptions = $('<fieldset class="form-group mc-option-change">' +
            '<button type="button" class="btn btn-default mc-remove-option"><span class="glyphicon glyphicon-minus"></span></button>' +
            '<button type="button" class="btn btn-default mc-add-option"><span class="glyphicon glyphicon-plus"></span></button></fieldset>');
        return addRemoveOptions.add(createMultipleChoiceOptions(4));
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

            var correctButton = $('<button type="button" class="btn btn-default mc-correct-answer"><span class="glyphicon glyphicon-ok"></span></button>');

            option.find('.correct-answer').append(correctButton);

            r = r.add(option);
        }

        return r;
    }

    function createCodeArea() {
        $('.question-type-area').attr('class', 'question-type-area coding');
        var editor = $('<div id="editor" class="code-editor mc-code">// Enter your code here</div>');
        var io = $('<fieldset class="form-group input-output"> <label>Input / Output </label></fieldset>');
        var removeIo = $('<button type="button" class="btn btn-default remove-io"><span class="glyphicon glyphicon-minus"></span></button>');
        var addIo = $('<button type="button" class="btn btn-default add-io"><span class="glyphicon glyphicon-plus"></span></button>');
        var io1 = $('<button type="button" class="btn btn-default io active" data-io="1"><span>IO 1</span></button>');
        var io2 = $('<button type="button" class="btn btn-default io" data-io="2"><span>2</span></button>');
        var io3 = $('<button type="button" class="btn btn-default io" data-io="3"><span>3</span></button>');

        removeIo.on('click', function () {
            if ($('.io').length > 3) {
                $('.io').last().remove();
            }
        });

        addIo.on('click', function () {
            var io_length = $('.io').length;
            if (io_length < 8) {
                var io_count = ($('.io').length + 1);
                var new_io = $('<button type="button" class="btn btn-default io" data-io="' + io_count + '"><span>' + io_count + '</span></button>');
                $('.io').last().after(new_io);
            }
        });

        var inputTextarea = $('<textarea class="form-control" id="input_textarea" rows="3" placeholder="Question Input 1"></textarea>');
        var outputInput = $('<input type="text" id="output-input" class="form-control" placeholder="Expected Output 1">');

        io.append(removeIo);
        io.append(addIo);
        io.append(io1);
        io.append(io2);
        io.append(io3);
        io.append(inputTextarea);
        io.append(outputInput);

        $('.modal').on('click', '.io', function () {
            ioButtonClick($(this));
        });

        inputTextarea.on('keyup', function () {
            $('.io.active').data('input', $(this).val());
        });

        outputInput.on('keyup', function () {
            $('.io.active').data('output', $(this).val());
        });

        return editor.add(io);
    }

    function ioButtonClick(button) {
        if (!button.hasClass('active')) {
            button.find('span').text('IO ' + button.data('io'));
            $('fieldset.input-output .io.active').data('input', $('fieldset.input-output textarea').val());
            $('fieldset.input-output .io.active').data('output', $('fieldset.input-output input').val());
            $('fieldset.input-output textarea').val(button.data('input'));
            $('fieldset.input-output input').val(button.data('output'));
            $('fieldset.input-output textarea').attr('placeholder', 'Question Input ' + button.data('io'));
            $('fieldset.input-output input').attr('placeholder', 'Expected Output ' + button.data('io'));
            $('.io.active>span').text($('.io.active').data('io'));
            $('.io.active').removeClass('active');
            button.addClass('active');
            $('fieldset.input-output textarea').focus();
        }
    }

    $('#q-and-a-plugin').on('click', ' .modal .create-question', function () {
        console.log('test');
        $('.modal *').removeClass('error');
        $('.modal .error-text').remove();
        var questionName = $('#q-name-input');

        if (questionName.val().length < 10) {
            questionName.addClass('error');
        }

        var questionStatement = $('#q-statement-input');

        if (questionStatement.val().length < 50) {
            questionStatement.addClass('error');
        }

        var questionType = $('#q-type-select').find('option:selected').text();

        var questionCode;

        if (questionType == 'Multiple Choice') {
            var option_count = $('.mc-text-option').length;
            if (!$('.mc-text-option .form-control.wrong').length) {
                $('.mc-option-change').after('<span class="error-text">There must be at least one wrong answer!</span>');
            }
            else if ($('.mc-text-option .form-control.wrong').length == option_count) {
                $('.mc-option-change').after('<span class="error-text">There must be at least one correct answer!</span>');
            }
        }
        else {
            questionCode = ace.edit('editor').getValue();

            $('.io').each(function () {
                if (!$(this).data('input') || !$(this).data('output')) {
                    $(this).addClass('error');
                }
            });
        }

        $('.hint').each(function () {
            if ($(this).data('hint-text')) {
                if ($(this).data('hint-text').length < 20) {
                    $(this).addClass('error');
                }
            }
            else {
                $(this).addClass('error');
            }
        });

        console.log('question name: ' + questionName);
        console.log('question type: ' + questionType);
        console.log('question statement: ' + questionStatement);
        console.log('question code: ' + questionCode);
        console.log('success');
    });

});
