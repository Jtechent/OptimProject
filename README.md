# Website Optimization Project
___
Project Submission for the Udacity Project Optimization Course.
## How to: Getting up and running
___
### Prerequisites

#### Python 2.7

Python download instructions, as well as the files can be found at [here](python.org).
#### Ngrok

Download according to instructions found [here](https://ngrok.com/download). Make sure to select the compatible version with your operating system and to unzip the file into the project directory.

### Running the project


1. Open a terminal.
2. Navigate to project directory.
3. Enter the command ` python -m SimpleHTTPServer`. The command will print a message of the form `Serving HTTP on 0.0.0.0 port [some port number]`. The project can be viewed in a web browser by navigating to http://0.0.0.0:port_number/index.min.html.
4. If you wish to be able to access the project over the web:
    1. Repeat steps one and two.
    2. enter the command `./ngrok http [port python is serving on]`.
    3. Once ngrok is connected to the web navigate to the one of the forwarded URLs/index.min.html in a browser.


## Optimizations
___
### Index.html
The index.html file had three render blocking style sheets, as well as a parser blocking external js document, and links which navigated to very similar pages.
I reduced the time to first render by inlining one of the style sheets, which was rather lengthy but not so large that multiple trips to the server were required to fetch the document. Another file gave style rules used for when the webpage was printed so I added a media query to the style tag so that the browser would know it was not necessary to render the page and download that style sheet. The third style sheet was a font, Page Speed Insights did not like this at all so I downloaded the font and inserted a font face declaration to link it into the page.

I also thought it was a bit silly to make a server request to follow the hyperlinks found on the page which effectively just changed to inner contents of the div.container element. Therefore, I created a JSON object which contained the various inner contents of the project-[something].html files' div.container element, ajaxed that JSON in after the page rendered and on a successful response from the server I added a click event handler to the different links which would swap out the inner contents of div.container with the appropriate content.

### Pizza.html
The pizza.html file contained two animations which produced jank, the resizing of the pizzas in the randomPizzaContainer, and the repositioning of the img.mover elements. The jankatude of those particular animations was due to the javascript inducing a forced synchronous reflow. I refactored the javascript to remove the forced synchronous reflow by batching the reads of the css together and after changing the css.

### Gulp
I used gulp to minify the files to be sent to the client and optimize the images.

### Misc.
I used Imagemagick mogrify and convert commands to reduce the image quality on uselessly large image files, as well as change their dimensions.
