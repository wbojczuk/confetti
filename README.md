# confetti

Demo: https://wbojczuk.github.io/confetti

Just a confetti animation. Made with JS/CSS.

There are global options available in the .js file but data attributes on the HTML element can also pass settings to the script.

**REMEMBER TO PASS OPTIONS THAT REQUIRE ARRAYS LIKE SUCH:
    data-colors='["red", "green", "blue"]'
This is because the arrays have to be parsed as a JSON object and must follow this syntax. single quotes on the outside and souble quotes on the inside.

**OPTIONS
    data-height='[min, max]'
    data-speed='[min, max]'
    data-spread='[min, max]'
    data-delay='[min, max]'
    data-amt="amount"
    data-colors='["red", "green"]'
    data-spin='[min, max]'
    data-size='[min, max]'
