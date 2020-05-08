    $(function() {
        var selected = [];
        var diceData = []; //["A", "B","C","D","E", "F","G","H","I","K","L","M","N","O","P","S"]
        var word = "";
        var selectedWordArr = [];
        var validWordDef = [];
        getDashBoardData();

        countDownTimer('time-limit', 1, 0);
        $('button.btn').click(function() {
            var r = $(this).attr('m-r');
            var c = $(this).attr('m-c');
            var v = $(this).html();
            var isExist = selected.filter(x => x.r == r && x.c == c);
            if (isExist.length == 0) {
                selected.push({
                    r: r,
                    c: c,
                    v: v
                });
                word += v;
                if (word.length < 2) $('#btn-submit').attr('disabled', true);
                else {
                    $('#btn-submit').attr('disabled', false);
                }
                $('#selected-letters').val(word);
            };
            calcNextSelection(r, c);

        });

        $('#btn-submit').click(function() {
            submit();
        });

        $('#btn-reset').click(function() {
            reset();
        });

        function submit() {
            var val = $('#selected-letters').val();
            if (val) {
                $('#btn-submit').attr('disabled', true);
                $('#btn-reset').attr('disabled', true);
                var isNewWord = false;
                if (selectedWordArr.filter(x => x.text == val).length == 0) {
                    selectedWordArr.push({
                        isValid: 0,
                        text: val
                    });
                    isNewWord = true;
                }
                var jqxhr = $.ajax("/check?word=" + val)
                    .done(function(res) {
                        console.log(res);
                        $('#selected-letters').val('');
                        var wd = '';
                        if (res.status == 100) {
                            var score = $('#hdn-score').val();
                            validWordDef.push(res.data);
                            if (isNewWord) {
                                $('#hdn-score').val(parseInt(score) + parseInt(val.length));
                            }

                            wd = '<a class="s-w" href="javascript:void(0);" title="See definitions" value=' + res.data.word + '>' + val + ', ' + '</a>';

                            $(function() {
                                $('.s-w').click(function() {
                                    var val = $(this).attr('value');
                                    var data = validWordDef.filter(x => x.word == val)[0];
                                    var html = "";
                                    $('.modal-title').html(val.toUpperCase());
                                    $('.modal-body').html('');
                                    if (data.definitions.length == 0) {
                                        html = '<div class="alert alert-danger">Oops!!! No definition found.</div>';
                                        $('.modal-body').html(html);
                                    } else {
                                        $.each(data.definitions, function(i, v) {
                                            html = '<div class="alert alert-info"><span>' + v.definition + '| (' + v.partOfSpeech + ')</span></div>';
                                            $('.modal-body').append(html);
                                        });
                                    }
                                    $('#modal-result').modal('show');
                                });
                            })
                        } else {
                            wd = '<span class="f-w">' + val + ', ' + '</span>';
                        }

                        $('#selected-words').append(wd);
                        selected = [];
                        word = "";
                        printDiceBoard();
                    })
                    .fail(function(res) {
                        console.log(res.statusText);
                        alert(res.statusText);
                    })
                    .always(function() {
                        $('#btn-submit').attr('disabled', false);
                        $('#btn-reset').attr('disabled', false);
                    });
            }
        }

        function reset() {
            $('#selected-letters').val('');
            selected = [];
            selectedWordArr = [];
            word = "";
            printDiceBoard();
        }

        function getDashBoardData() {
            var jqxhr = $.ajax("/dashboard")
                .done(function(res) {
                    console.log(res);
                    $.each(res, function(i, v) {
                        diceData.push(v);;
                    });
                })
                .fail(function(res) {
                    $('#txt-msg').html('<div class="alert alert-danger">Oops! Error while loading dice.</div>');
                    console.log(res.statusText);
                })
                .always(function() {
                    printDiceBoard();
                });
        }

        function printDiceBoard() {
            var mi = 4;
            var c = 0;
            var html = '<table class="table table-bordered align-self-left table-dice">';
            html += '<tbody>';
            for (var i = 1; i <= mi; i++) {
                var j = 1;
                for (var j = 1; j <= mi; j++) {
                    var v = diceData[c];
                    if (j == 1) html += '<tr>';

                    html += '<td><button href="javascript:void(0)"  value="' + v + '" m-r="' + i + '" m-c="' + j + '" class="btn btn-val">' + v + '</button></td>';

                    if (j == mi) html += '</tr>';

                    c++;
                }
            }
            html += '</tbody></table>';
            html += '<div class="col-md-4">';
            html += '<li class="info-li"><span class="info info-s"></span>Selected</li>';
            html += '</div>';

            html += '<div>';
            html += '<li class="info-li"><span class="info info-npm"></span>Next Possible Move</li>';
            html += '</div>';

            $('#dice-board').html(html);

            $('button.btn').click(function() {

                var r = $(this).attr('m-r');
                var c = $(this).attr('m-c');
                var v = $(this).html();
                var isExist = selected.filter(x => x.r == r && x.c == c);
                if (isExist.length == 0) {
                    selected.push({
                        r: r,
                        c: c,
                        v: v
                    });
                    word += v;
                    if (word.length < 2) $('#btn-submit').attr('disabled', true);
                    else {
                        $('#btn-submit').attr('disabled', false);
                    }
                    $('#selected-letters').val(word);
                };
                calcNextSelection(r, c);
            });
        }

        function calcNextSelection(x2, y2) {
            $('.btn-val').each(function() {
                var x1 = $(this).attr('m-r');
                var y1 = $(this).attr('m-c');
                var d = Math.sqrt(Math.pow(Math.abs(x1 - x2), 2) + Math.pow(Math.abs(y1 - y2), 2))
                var isAlreadySelected = selected.filter(x => x.r == x1 && x.c == y1);

                // console.log(x1, y1,d);
                if (isAlreadySelected.length >= 1) {
                    $(this).attr('disabled', true);
                    $(this).parent('td').addClass('selected');
                    $(this).parent('td').removeClass('next-move');
                } else if ((d == Math.sqrt(1) || d == Math.sqrt(2))) {
                    $(this).attr('disabled', false);
                    $(this).parent('td').addClass('next-move');
                } else {
                    $(this).attr('disabled', true);
                    $(this).parent('td').removeClass('next-move');
                }
            })
        }

        function countDownTimer(ele, min, sec) {
            var time = min * 60 + sec;
            var interval = setInterval(function() {
                var el = $('#' + ele);
                // if the time is 0 then end the counter
                if (time <= 0) {
                    var text = "GAME OVER!!!";
                    $('#btn-submit').attr('disabled', true);
                    $('.btn-val').attr('disabled', true);
                    $('#btn-reset').attr('disabled', true);
                    var score = $('#hdn-score').val();
                    var msg = '<p>Congratulation!!!, you have scored: <h1 class="result-point">' + score + ' </h1></p>';
                    if (parseInt(score) <= 0)
                        msg = '<p>Oops!!!, you have scored: <h1 class="result-point">' + score + ' </h1></p>';

                    msg += '<a id="btn-replay" href="/boggle/index" class="btn btn-primary btn-sm">Click here to Play again</a>';
                    $('#txt-msg').html('<div class="alert alert-success">' + msg + '</div>');
                    el.html(text);
                    clearInterval(interval);
                    $('.modal-title').html(text);
                    $('.modal-body').html(msg);
                    $('#modal-result').modal('show');
                    $(function() {
                        $('#btn-replay').click(function(e) {
                            e.stopPropagation();
                        })
                    })
                    return;
                }
                var minutes = Math.floor(time / 60);
                if (minutes < 10) minutes = "0" + minutes;
                var seconds = time % 60;
                if (seconds < 10) seconds = "0" + seconds;
                var text = minutes + ':' + seconds;
                el.html(text);
                time--;
            }, 1000);
        }
    });