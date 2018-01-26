# Emory University - Dev Starter Kit

1. Download this project to your local machine.
2. Make a new repository on the EmoryCPA github account.
3. Add yourself as a collaborator: Settings > Collaborators > you@emory.edu
4. Check your email for the collaboration invite and accept.
5. Open the project you downloaded and Git Bash inside the base folder.
5. Follow the instructions to initialize the new repository.
```
echo "# YOURPROJECT" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/emorycpa/NEW-PROJECT.git
git push -u origin master
```
7. Open your project in Visual Studio Code.
8. Go to the Source Control tab and stage, commit, and push all the files to your new repository.

## Getting Started

These instructions will get you a copy of the starer kit up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Be sure to have the following installed:

```
Node.js
```

### Installing

Once you have cloned this repository, open the command line and run:

```
npm i
```

Then once all Node modules are installed, run:

```
gulp watch:serve
```

This will launch a page in your default browser on localhost:3000.

## Deployment

All compiled files will be found under the 'build' directory.

## Built With

* [Boostrap 4](https://getbootstrap.com/) - Web framework
* [Gulp](https://gulpjs.com/) - Workflow automation
* [SASS](http://sass-lang.com/documentation/file.SCSS_FOR_SASS_USERS.html) - CSS preprocessor
* [Nunjucks](https://mozilla.github.io/nunjucks/) - Javascript templating language

## Authors

* **Bryce Roberts** - *Initialization* - [bryce.leitner.roberts@gmail.com](mailto:bryce.leitner.roberts@gmail.com)
* **Kayla Pratt** - *Front-end development* - [kaylapratt.com](http://kaylapratt.com)

See also the list of [contributors](https://github.com/emorycpa/emory.dev/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
