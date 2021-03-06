'use strict';

let articles = [];

// done: What is the purpose of the following function? Why is its name capitalized? Explain the context of "this" within the function. What does "rawDataObj" represent?
// Article is a constructor function which will create Article objects, that is why it's capitalized. This refers to the object that is currently being constructed. The rawdataObj will be the parameter that will be feeding to the article constructor.

function Article (rawDataObj) {
  // done: Use the JS object that is passed in to complete this constructor function:
  this.title = rawDataObj.title;
  this.category = rawDataObj.category;
  this.author = rawDataObj.author;
  this.authorUrl = rawDataObj.authorUrl;
  this.publishedOn = rawDataObj.publishedOn;
  this.body = rawDataObj.body;
  // done: Save ALL the properties of `rawDataObj` into `this`
}

Article.prototype.toHtml = function() {
  // done: What is the benefit of cloning the article? (see the jQuery docs)
  // Appending something moves it from where it was to the new target location, but cloning() creates a new instance of the target object.

  let $newArticle = $('article.template').clone();
  /* done: This cloned article still has a class of template. In our modules.css stylesheet, we should give all elements with a class of template a display of none so that our template does not display in the browser. But, we also need to make sure we're not accidentally hiding our cloned article. */

  if (!this.publishedOn) $newArticle.addClass('draft');
  $newArticle.removeClass('template');
  $newArticle.attr('data-category', this.category);

  // Done: Now use jQuery traversal and setter methods to fill in the rest of the current template clone with values of the properties of this particular Article instance.

  $newArticle.find('a').text(this.author);
  $newArticle.find('a').attr('href', this.authorUrl);
  $newArticle.find('h1').text(this.title);
  $newArticle.find('.article-body').html(this.body);
  $newArticle.find('time').attr('datetime', this.publishedOn);

  // REVIEW: Display the date as a relative number of 'days ago'
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $newArticle.append('<hr>');
  return $newArticle;
};

rawData.sort(function(a,b) {
  // REVIEW: Take a look at this sort method; This may be the first time we've seen it. Look at the docs and think about how the dates would be sorted if the callback were not included in this method.
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

// TODO: Refactor these for loops using the .forEach() array method.

rawData.forEach(function(val, index){
  articles.push(new Article(rawData[index]));
})

articles.forEach(function(val, index){
  $('#articles').append(articles[index].toHtml());
})
