<html>
<head>
   <title>Design Pattern learning</title>
    <?php
        preg_match('/MSIE (.*?);/', $_SERVER['HTTP_USER_AGENT'], $matches);
        if (count($matches)<2) {
          preg_match('/Trident\/\d{1,2}.\d{1,2}; rv:([0-9]*)/', $_SERVER['HTTP_USER_AGENT'], $matches);
        }
        if (count($matches)>1) {
            echo '<script src="http://rsvpjs-builds.s3.amazonaws.com/rsvp-latest.min.js"></script>
                  <script>var Promise = RSVP.Promise;</script>';
            $version = $matches[1];
            if ($version<=8) {
                echo '<script src="//cdnjs.cloudflare.com/ajax/libs/json2/20130526/json2.js"></script>';
            }
        }
    ?>

</head>

<body>

    <script src="../lib/require.js"></script>
    <script src="script.js"></script>
</body>

</html>
