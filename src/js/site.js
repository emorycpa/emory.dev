(function ($) {
    if (!$) throw "jQuery library is required."

    const $doc = $(document);

    //Ready function
    $doc.ready(function () {
        $(function () {
            $('[data-toggle="tooltip"]').tooltip();
            $('[data-toggle="popover"]').popover();
        });
    });

})(jQuery);