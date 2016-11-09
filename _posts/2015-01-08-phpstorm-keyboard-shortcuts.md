---
title: Timesaving PhpStorm Keyboard Shortcuts to Increase Productivity
description: Learn and use these timesaving PhpStorm keyboard shortcuts to increase your productivity.
layout: page
---

# Timesaving PhpStorm Keyboard & Mouse Shortcuts to Increase Productivity

{% include date.html %}

Some developers will pass over [PhpStorm](https://www.jetbrains.com/phpstorm/) (or other [JetBrains products](https://www.jetbrains.com/products.html)) because it doesn’t embody the same look and feel of a typical Mac application, which is unfortunate. PhpStorm is a powerhouse packed with productivity boosting features, that once you use them, you will never be able to use a standard text editor again.

I know that most text editors do have a wealth of plugins that offer some of the same functionality below, but in my experience, the implementation and execution of those plugins usually do not match in quality to what PhpStorm offers out of the box.

Not to mention everything below comes baked into PhpStorm and works consistently, without having to scour the internet to find these plugins or worry about their ongoing support.

All the shortcuts will work for multiple languages such as PHP, JavaScript, Sass, Less, HTML, etc.

## Keyboard Shortcut Legend

Just so we’re all speaking the same language... Below are the keyboard symbols used in the rest of the article so we know what they mean.

* **Command**: <kbd>⌘</kbd> on Mac
* **Alt / Option**: <kbd>⌥</kbd> on Mac, <kbd>Alt</kbd> on Windows
* **Control**: <kbd>⌃</kbd> on Mac, <kbd>Ctrl</kbd> on Windows
* **Shift**: <kbd>⇧</kbd> on Mac, <kbd>Shift</kbd> on Windows
* **Enter**: <kbd>⏎</kbd> on Mac, <kbd>Enter</kbd> on Windows
* **Delete**: <kbd>⌫</kbd> on Mac
* **Up Arrow**: <kbd>↑</kbd> on Mac, <kbd>Up</kbd> on Windows
* **Down Arrow**: <kbd>↓</kbd> on Mac, <kbd>Down</kbd> on Windows

## Default Keyboard Shortcuts

Ok. With All that out of the way, below are the default keyboard shortcuts that ship with PhpStorm.

### Reveal Tool Windows

* Mac: <kbd>⌘⌘</kbd> (Double Press / Tap and Hold)
* Windows: <kbd>Alt + Alt</kbd> (Double Press / Tap and Hold)

Starting in PhpStorm 7, I believe, JetBrains decided to hide the Tool Windows, by default, to declutter the UI. To reveal the Tool Windows on the sides and bottom of IDE, just double press / tap the command keys.

![PhpStorm reveal tool windows keyboard shortcut screencast]({{site.url}}/images{{page.url}}phpstorm-keyboard-shortcut-reveal-tool-windows.gif)

### Find Action

* Mac: <kbd>⌘⇧A</kbd>
* Windows: <kbd>Ctrl + Shift + A</kbd>

Find Action is like the super keyboard shortcut. You can use it to search for shortcuts and IDE actions (aka. things you can do that don’t even have keyboard shortcuts). This is helpful for discovering shortcuts you don’t already know or for jogging your memory by typing in a keyword or phrase.

![PhpStorm find action keyboard shortcut screencast]({{site.url}}/images{{page.url}}phpstorm-keyboard-shortcut-find-action.gif)

### Navigate File

* Mac: <kbd>⌘⇧O</kbd>
* Windows: <kbd>Ctrl + Shift + N</kbd>

Navigate File is just a fancy name to mean "open files".

Navigate File also support searching for files with wildcards, title case, file extension, etc..

![PhpStorm navigate file keyboard shortcut screencast]({{site.url}}/images{{page.url}}phpstorm-keyboard-shortcut-navigate-file.gif)

### Rename

* Mac: <kbd>⇧F6</kbd>
* Windows: <kbd>Shift + F6</kbd>

Using this, you can rename practically anything, such as variables, functions, filenames, class names, html tags, etc. This even works for some more obscure languages you wouldn't expect, like Less / Sass, Mustache, and PHPDoc, to name a few.

Not only that, but it will automatically refactor all places these things are within the entire project.

![PhpStorm rename keyboard shortcut screencast]({{site.url}}/images{{page.url}}phpstorm-keyboard-shortcut-rename.gif)

### Show Intention Actions

* Mac: <kbd>⌥⏎</kbd>
* Windows: <kbd>Alt + Enter</kbd>

This is a super fancy name for "fix problems". Show Intention Actions is for anything from fixing typos / spelling, to fixing incorrect parameters, to automatically updating your PHPDoc if you change parameters, and much, much more.

Use this wherever you see a yellow or red squiggly line underneath something.

![PhpStorm show intention actions keyboard shortcut screencast]({{site.url}}/images{{page.url}}phpstorm-keyboard-shortcut-show-intention-actions.gif)

### Open Terminal

* Mac: <kbd>⌥F12</kbd>
* Windows: <kbd>Alt + F12</kbd>

Yes, PhpStorm has a fully functional Terminal baked right into it. This is incredibly handy, especially when you're using tools like [NPM](https://www.npmjs.com/), [Grunt](http://gruntjs.com/), [Gulp](http://gulpjs.com/), [Composer](https://getcomposer.org/), etc. in your projects. Mash <kbd>⌥F12</kbd> and you're there, ready to rock a command.

No context switching, no fumbling for the right window. Just seamless productivity.

![PhpStorm open terminal keyboard shortcut screencast]({{site.url}}/images{{page.url}}phpstorm-keyboard-shortcut-open-terminal.gif)

### New

* Mac: <kbd>⌘N</kbd>
* Windows: <kbd>Alt + Insert</kbd>

Use the New command when you have a folder selected in the project window and you can insert / create a new files and folders.

You can even create nested files and directories with the same command.

![PhpStorm new keyboard shortcut screencast]({{site.url}}/images{{page.url}}phpstorm-keyboard-shortcut-new.gif)

### Find In Path

* Mac: <kbd>⌘⇧F</kbd>
* Windows: <kbd>Ctrl + Shift + F</kbd>

Find In Path will search your entire project for just about anything.

You can refine scope to a particular folder, do a reclusive search, match case, regex, etc. A crazy amount of search power for such a little window.

And if you have anything selected, that will automatically become the search term.

![PhpStorm find in path keyboard shortcut screencast]({{site.url}}/images{{page.url}}phpstorm-keyboard-shortcut-find-in-path.gif)

### Paste From History

* Mac: <kbd>⌘⇧V</kbd>
* Windows: <kbd>Ctrl + Shift + V</kbd>

This is also known as Clipboard History.

This keeps a running log of things you’ve copied within PhpStorm and you can use it pretty much anywhere within PhpStorm, including the find / replace fields, extracting variables, extracting methods, renaming, etc.

![PhpStorm paste from histroy keyboard shortcut screencast]({{site.url}}/images{{page.url}}phpstorm-keyboard-shortcut-paste-from-history.gif)

I believe the default history limit is set to 5, which is weak.

Just navigate to `PhpStorm > Preferences > IDE Settings > Editor > Maximum number of contents to keep in clipboard` to up that limit to something more respectable. I have mine set to `50`.

### Move Line Up / Down

* Mac: <kbd>⌥⇧↑</kbd> and <kbd>⌥⇧↓</kbd>
* Windows: <kbd>Alt + Shift + Up</kbd> and <kbd>Alt + Shift + Down</kbd>

These shortcuts move whatever line of code the cursor is on up or down a single line.

Very handy for changing the order of an array or declared variables. And most times, it will even shuffle the commas around appropriately too!

![PhpStorm move line up and down keyboard shortcut screencast]({{site.url}}/images{{page.url}}phpstorm-keyboard-shortcut-move-line-up-and-down.gif)

### Move Statement Up / Down

* Mac: <kbd>⌘⇧↑</kbd> and <kbd>⌘⇧↓</kbd>
* Windows: <kbd>Ctrl + Shift + Up</kbd> and <kbd>Ctrl + Shift + Down</kbd>

These work much like the Move Line Up / Down shortcuts, but these will move whole statements up or down a single line.

Think along the lines of entire functions, objects, or arrays instead of just a single part of those things.

![PhpStorm move statement up and down keyboard shortcut screencast]({{site.url}}/images{{page.url}}phpstorm-keyboard-shortcut-move-statement-up-and-down.gif)

## Debugging

* Mac: <kbd>F7</kbd> (Step Into), <kbd>F8</kbd> (Step Over), and <kbd>⌥⌘R</kbd> (Resume)
* Windows: <kbd>F7</kbd> (Step Into), <kbd>F8</kbd> (Step Over), and <kbd>F9</kbd> (Resume)

Once you [setup and launch a debugging session]({% post_url 2015-01-06-setup-phpstorm-xdebug-mamp-debugging %}), I use these shortcuts to navigate through the code with ease.

![PhpStorm debugging keyboard shortcut screencast]({{site.url}}/images{{page.url}}phpstorm-keyboard-shortcut-debugging.gif)

### Extend / Shrink Selection

* Mac: <kbd>⌥↑</kbd> and <kbd>⌥↓</kbd>
* Windows: <kbd>Ctrl + W</kbd> and <kbd>Ctrl + Shift + W</kbd>

These shortcuts will gradually increase or decrease what you have selected, at logical breaking points, and even within strings!

This is one of those features that wish was available in any application or operating system once you start to use it.

![PhpStorm extend and shrink selection keyboard shortcut screencast]({{site.url}}/images{{page.url}}phpstorm-keyboard-shortcut-extend-and-shrink-selection.gif)

### Extract Variable

* Mac: <kbd>⌥⌘V</kbd>
* Windows: <kbd>Ctrl + Alt + V</kbd>

Extract Variable works by taking whatever you have selected and creating a new variable out of it.

This even works for Less / Sass variables too!

![PhpStorm extract variable keyboard shortcut screencast]({{site.url}}/images{{page.url}}phpstorm-keyboard-shortcut-extract-variable.gif)

### Extract Method

* Mac: <kbd>⌥⌘M</kbd>
* Windows: <kbd>Ctrl + Alt + M</kbd>

Extract Method works by taking whatever you have selected and creating a new method / function out of it, including any necessary parameters.

![PhpStorm extract method keyboard shortcut screencast]({{site.url}}/images{{page.url}}phpstorm-keyboard-shortcut-extract-method.gif)

### Inline

* Mac: <kbd>⌥⌘N</kbd>
* Windows: <kbd>Ctrl + Alt + N</kbd>

Inline is the opposite of the extract shortcuts mentioned above.

It will take variables and methods and will bring them back inline where they are in use.

![PhpStorm inline keyboard shortcut screencast]({{site.url}}/images{{page.url}}phpstorm-keyboard-shortcut-inline.gif)

### Duplicate Line or Block

* Mac: <kbd>⌘D</kbd>
* Windows: (unknown)

This shortcut will duplicate the line of code the cursor is on, if nothing is selected.

If something is selected, it will duplicate whatever is selected.

![PhpStorm duplicate line or block keyboard shortcut screencast]({{site.url}}/images{{page.url}}phpstorm-keyboard-shortcut-duplicate-line-or-block.gif)

### Delete Line

* Mac: <kbd>⌘⌫</kbd>
* Windows: <kbd>Ctrl + Y</kbd>

This shortcut will remove the line of code the cursor is on, if nothing is selected.

If something is selected, it will remove whatever lines are selected.

![PhpStorm delete line keyboard shortcut screencast]({{site.url}}/images{{page.url}}phpstorm-keyboard-shortcut-delete-line.gif)

### Code Completion

* Mac: <kbd>⌃Space</kbd>
* Windows: <kbd>Ctrl + Space</kbd>

This feature pretty standard in most apps, but even though it's such a common feature, I still use it every single day, so it's worth the mention.

Code Completion works by offering suggestions for variables and methods to complete what you have partially typed.

Most of the time, this will just work on its own, but if you're typing really fast, then you can explicitly invoke it with the shortcut.

![PhpStorm code completion keyboard shortcut screencast]({{site.url}}/images{{page.url}}phpstorm-keyboard-shortcut-code-completion.gif)

## Custom Keyboard Shortcuts

Those defaults are all well and good, but what if you want to change or customize your keyboard shortcuts? What if you want to create new keyboard shortcuts for features you use within PhpStorm that don’t have a keyboard shortcut defined?

No problem! PhpStorm has this covered in what they call Keymap. Just navigate to `PhpStorm > Preferences > IDE Settings > Keymap` to uncover all the goodies.

In the Keymap, you can search for actions by their name or by their assigned keyboard shortcut.

![PhpStorm keymap searching screencast]({{site.url}}/images{{page.url}}phpstorm-keymap-searching.gif)

For example, I use the Split Vertically action all the time, so I can have two editor windows open at the same time, usually when I want to write some markup and some styles at the same time. This is such a huge timesaver to have either file accessible as I am building things out.

Split Vertically doesn’t have a keyboard shortcut by default, so add it to the Keymap, and you’re ready to go! I chose <kbd>⌃⌥⌘V</kbd> as my Split Vertically shortcut.

![PhpStorm split vertically keyboard shortcut screencast]({{site.url}}/images{{page.url}}phpstorm-keyboard-shortcut-split-vertically.gif)

Don’t worry if you use something that is already defined as a shortcut. PhpStorm will let you know and ask you if you want to remap the keys.

## Mouse Shortcuts

I know that sounds weird, but hear me out.

There are a couple of mouse shortcuts I want to point out that I find incredibly handy.

### Hide / Reveal Tool Windows

Once you get cranking away, the IDE can get pretty busy with all kinds of panels, files, terminals, etc. open and now you want to eliminate all the distractions and you want to see as many lines of code as possible.

Just double-click any editor tab to hide all the open Tool Windows. And double-click again to bring them all back.

![PhpStorm hide and reveal tool windows mouse shortcut screencast]({{site.url}}/images{{page.url}}phpstorm-mouse-shortcut-hide-and-reveal-tool-windows.gif)

### Redistribute Editor Windows

When I have multiple editor windows open, I am constantly moving things around, resizing the windows to give me the most space on what I am working on the most, but now I want to have them be evenly spaced again.

Simply double-click on the space between the split editors to evenly redistribute them.

![PhpStorm redistribute editor windows mouse shortcut screencast]({{site.url}}/images{{page.url}}phpstorm-mouse-shortcut-redistribute-editor-windows.gif)

---

Once you get the hang of these shortcuts, you’ll feel and incredible source of power and confidence, especially when refactoring. And you’ll wonder why you waited so long to ditch your text editor of choice for a fully functional IDE.
