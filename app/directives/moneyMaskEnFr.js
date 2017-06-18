angular.module('myApp')
        .directive('moneyMaskEnFr', function ($timeout) {

        var toNumberRegex = new RegExp('[^0-9\.]', 'g');
        var toNumberStringRegex = new RegExp('[^0-9\\.]', 'g');
        var checkForNumbersRegex = new RegExp('[0-9]', 'g');

        function getCaretPosition(input){
            if (!input) return 0;
            if (input.selectionStart !== undefined) {
                return input.selectionStart;
            } else if (document.selection) {
                // For IE < 9
                input.focus();
                var selection = document.selection.createRange();
                selection.moveStart('character', input.value ? -input.value.length : 0);
                return selection.text.length;
            }
            return 0;
        }

        function setCaretPosition(input, pos){
            if (!input) return 0;
            if (input.offsetWidth === 0 || input.offsetHeight === 0) {
                return; // Input's hidden
            }
            if (input.setSelectionRange) {
                input.focus();
                input.setSelectionRange(pos, pos);
            }
            else if (input.createTextRange) {
                // For IE < 9
                var range = input.createTextRange();
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        }

        function toNumber(currencyStr) {
            return parseFloat(currencyStr.replace(toNumberRegex, ''));

        }

        function toNumberString(currencyStr) {
            return currencyStr.replace(toNumberStringRegex, '');

        }

        function getSubstringPositions(substring, string){
            var substringPositions = [];
            var i = 0;

            while((i = string.indexOf(substring, i + 1)) >= 0) {
                substringPositions.push(i);
            }
            return substringPositions;

        }

        function removeExtraDecimals(value){
            var decimalList = getSubstringPositions('.', value);

            (function () {
                if(decimalList != undefined){

                    // Get rid of all decimals but the last
                    for(var i = 0; i < decimalList.length - 1; i++){
                        value = value.slice(0, decimalList[i]) +  value.slice(decimalList[i] + 1);

                    }

                }
            })();

            return value;
        }

        function trimLeadingZeros(value){
            var breakCounter;
            while(value.indexOf('0') === 0){
                value = value.slice(1);

                breakCounter += 1;
                if(breakCounter > 20){
                    break;
                }
            }

            return value;
        }

        function trimZerosAfterDecimal(value, placesAfterDecimal){
            // Trim digits after 2 significant digits.
            var decimalPointPos = value.indexOf('.');

            if(decimalPointPos > -1){
                var stringA = value.slice(0, decimalPointPos);

                var stringB = value.slice(decimalPointPos, decimalPointPos + placesAfterDecimal);

                value = stringA + stringB;

            }

            return value;
        }

        function addEnglishCommas(value){
            var decimalPointPos = value.indexOf('.');
            var commaStart;
            var nextCommaPos = 3;
            var breakCounter = 0;

            if(decimalPointPos > -1){
                commaStart = decimalPointPos + 0;
            } else {
                commaStart = value.length;
            }

            while (commaStart - nextCommaPos > 0){

                value = insertChar(value, commaStart - nextCommaPos, ",");
                nextCommaPos += 3;

                breakCounter += 1;
                if(breakCounter > 50){
                    break;
                }
            }

            return value;
        }

        function addFrenchSpaces(value){
            var decimalPointPos = value.indexOf('.');
            var spaceStart;
            var nextSpacePos = 3;
            var breakCounter = 0;

            if(decimalPointPos > -1){
                spaceStart = decimalPointPos + 0;
            } else {
                spaceStart = value.length;
            }

            while (spaceStart - nextSpacePos > 0){

                value = insertChar(value, spaceStart - nextSpacePos, " ");
                nextSpacePos += 3;

                breakCounter += 1;
                if(breakCounter > 50){
                    break;
                }
            }

            return value;
        }

        function insertChar(str, index, value) {
            return str.substr(0, index) + value + str.substr(index);
        }

        function checkNonNumberPressed(event){
            return !(event.keyCode === 13 || event.which === 13)
                && !(event.keyCode === 32 || event.which === 32)
                && !(event.keyCode === 49 || event.which === 49)
                && !(event.keyCode === 50 || event.which === 50)
                && !(event.keyCode === 51 || event.which === 51)
                && !(event.keyCode === 52 || event.which === 52)
                && !(event.keyCode === 53 || event.which === 53)
                && !(event.keyCode === 54 || event.which === 54)
                && !(event.keyCode === 55 || event.which === 55)
                && !(event.keyCode === 56 || event.which === 56)
                && !(event.keyCode === 57 || event.which === 57)
                && !(event.keyCode === 48 || event.which === 48)
                && !(event.keyCode === 44 || event.which === 44)
                && !(event.keyCode === 46 || event.which === 46)
                && !(event.keyCode === 8 || event.which === 8);

        }

        return {
            restrict: 'A',
            require: 'ngModel',
            link: link,
            scope: {
                ngModel: '='
            }
        };

        function link(scope, element, attrs, ctrl) {

            var language = "en";
            var nonNumericKeyPressed = 0;
            var cursorPosMod = 0;
            var oldView;
            var saveModel = 0;
            var digitsAfterDecimal = 3;

            // Set the language only if it is english or french
            if(attrs.moneyMaskEnFr != undefined && (attrs.moneyMaskEnFr !== "en" || attrs.moneyMaskEnFr !== "fr")){
                language = attrs.moneyMaskEnFr;
            }

            // Make the french maxlength one more since it has an extra character next to the space.
            if(language === "fr" && attrs.maxlength != undefined){
                var frenchMaxLength = (parseInt(attrs.maxlength) + 1).toString();
                attrs.$set('maxlength', frenchMaxLength);
            }

            // Set the number of characters including decimal to allow at the end of the string.
            if(attrs.moneySuffixCharCount != undefined && attrs.moneySuffixCharCount !== ''){
                digitsAfterDecimal = parseInt(attrs.moneySuffixCharCount);
            }

            // Filter out keypresses that aren't numbers, delete, backspace, decimal, or comma
            element.on('keypress', function(event){

                if(checkNonNumberPressed(event)){
                    nonNumericKeyPressed = 1;
                } else {
                    nonNumericKeyPressed = 0;
                }

            });

            ctrl.$formatters.unshift(filterCurrency);

            ctrl.$parsers.unshift(function (newViewValue) {

                var pos = getCaretPosition(element[0]);

                ctrl.$setViewValue(filterCurrency(newViewValue));

                ctrl.$render();

                // Only change the cursor position if the view value has changed
                if(ctrl.$viewValue !== oldView){

                    // If a comma or space is added, move the cursor.
                    // The string will be exactly 3 longer than the old string if a comma or space is added
                    if(oldView != undefined){
                            if(ctrl.$viewValue.length === oldView.length + 2){
                                cursorPosMod = 1;
                            } else if (ctrl.$viewValue.length + 2 === oldView.length) {
                                cursorPosMod = -1;
                            }
                        }


                    oldView = ctrl.$viewValue;


                    setCaretPosition(element[0], pos - nonNumericKeyPressed + cursorPosMod);

                    cursorPosMod = 0;


                } else {
                    // reset the caret position if it gets moved to the end when backspace or delete is pressed
                    var newPos = getCaretPosition(element[0]);
                    if(newPos === ctrl.$viewValue.length && newPos !== pos + 1){
                        setCaretPosition(element[0], pos + 1);
                    }
                }

                // console.log(toNumber(ctrl.$viewValue));
                // $timeout(function(){
                //     scope.ngModel = toNumber(ctrl.$viewValue);
                // }, 400);


                if(language === "en" && pos === 1){
                     setCaretPosition(element[0], 1);
                }

                if(language === "fr" && (pos === ctrl.$viewValue.length || pos === ctrl.$viewValue.length - 1 || pos === ctrl.$viewValue.length + 1)){
                    setCaretPosition(element[0], ctrl.$viewValue.length - 2);
                }

                // Prevent the cursor from going in front of the cursor if there is a zero.
                if(ctrl.$viewValue === "$0"){
                    setCaretPosition(element[0], 3);
                }

                if(ctrl.$viewValue === "0 $"){
                    setCaretPosition(element[0], 1);
                }

            });

            function filterCurrency(value) {

                if(language === 'fr'){
                    if(value === '' || value == undefined){
                        ctrl.$modelValue = 0;
                        return '0 $';
                    } else {

                        if(value.indexOf(',') > -1){
                            value = value.replace(',', '.');
                        }


                        value = removeExtraDecimals(value);
                        value = toNumberString(value);
                        value = trimLeadingZeros(value);
                        value = trimZerosAfterDecimal(value, digitsAfterDecimal);
                        value = addFrenchSpaces(value);

                        value = value.replace('.', ',');

                        value = value + " $";

                        if(value === " $"){
                            value = "0 $";
                        }

                        return value;
                    }

                } else {
                    if(value === '' || value == undefined){
                        ctrl.$modelValue = 0;
                        return '$0';
                    } else {
                        // Remove all decimals but the last and trim characters after decimal

                        value = removeExtraDecimals(value);
                        value = toNumberString(value);
                        value = trimLeadingZeros(value);
                        value = trimZerosAfterDecimal(value, digitsAfterDecimal);
                        value = addEnglishCommas(value);

                        value = "$" + value;

                        if(value === "$"){
                            value = "$0";
                        }

                        return value;
                    }
                }
            }

        }
    });
