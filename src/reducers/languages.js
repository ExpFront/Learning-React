import { handleActions } from 'redux-actions';
import { FILTER_LANGUAGES, SELECT_LANGUAGES, SHOW_DATA, HIDE_LIST } from '../constants/languages';

const initialState = {
  selected: undefined,
  filtered: [],
  all: [
    {"language": `Javascript`, "about": `JavaScript is a programming language used to make web pages interactive. It runs on your visitor's computer and doesn't require constant downloads from your website. JavaScript is often used to create polls and quizzes.`, "fullLink": `http://www.learn.javascript.ru`, "link": `learn.javascript.ru`, "id": `0`},
    {"language": `Python`, "about": `Python is an interpreted, object-oriented, high-level programming language with dynamic semantics. Its high-level built in data structures, combined with dynamic typing and dynamic binding, make it very attractive for Rapid Application Development, as well as for use as a scripting or glue language to connect existing components together.`, "fullLink": `http://www.python.org`, "link": `python.org`, "id": `1`},
    {"language": `Ruby`, "about": `Ruby is a programming language. It was created 20 years ago by Yukihiro “Matz” Matsumoto. By most measures of programming language popularity, Ruby ranks among the top ten, though usually as tenth (or so) in popularity, and largely due to the popularity of Rails. Like Java or the C language, Ruby is a general-purpose programming language, though it is best known for its use in web programming.`, "fullLink": `http:/www.http://www.ruby-lang.org`, "link": `ruby-lang.org`, "id": `2`},
    {"language": `Php`, "about": `PHP (recursive acronym for PHP: Hypertext Preprocessor) is a widely-used open source general-purpose scripting language that is especially suited for web development and can be embedded into HTML.`, "fullLink": `http://www.php.net`, "link": `php.net`, "id": `3`},
    {"language": `C++`, "about": `C# is an elegant and type-safe object-oriented language that enables developers to build a variety of secure and robust applications that run on the .NET Framework. You can use C# to create Windows client applications, XML Web services, distributed components, client-server applications, database applications, and much, much more. Visual C# provides an advanced code editor, convenient user interface designers, integrated debugger, and many other tools to make it easier to develop applications based on the C# language and the .NET Framework.`, "fullLink": `http://www.cprogramming.com`, "link": `cprogramming.com`, "id": `4`},
    {"language": `Haskell`, "about": `Haskell is a computer programming language. In particular, it is a polymorphically statically typed, lazy, purely functional language, quite different from most other programming languages. The language is named for Haskell Brooks Curry, whose work in mathematical logic serves as a foundation for functional languages. Haskell is based on the lambda calculus, hence the lambda we use as a logo.`, "fullLink": `http://www.wiki.haskell.org`, "link": `wiki.haskell.org`, "id": `5`},
    {"language": `Swift`, "about": `Swift is a new programming language for iOS, OS X, watchOS, and tvOS apps that builds on the best of C and Objective-C, without the constraints of C compatibility. Swift adopts safe programming patterns and adds modern features to make programming easier, more flexible, and more fun. Swift’s clean slate, backed by the mature and much-loved Cocoa and Cocoa Touch frameworks, is an opportunity to reimagine how software development works.`, "fullLink": `http://www.developer.apple.com/swift/`, "link": `developer.apple.com/swift/`, "id": `6`},
    {"language": `Java`, "about": `Java allows you to play online games, chat with people around the world, calculate your mortgage interest, and view images in 3D, just to name a few. It's also integral to the intranet applications and other e-business solutions that are the foundation of corporate computing.`, "fullLink": `http://www.webopedia.com`, "link": `webopedia.com`, "id": `7`},
  ],
};

const languages = handleActions({
  [FILTER_LANGUAGES]: (state, action) => {
    const filtered = state.all.filter((lang) => {
      return lang.language.toUpperCase().match(action.data.toUpperCase());
    });

    return {
      ...state,
      filtered,
    };
  },

  [SELECT_LANGUAGES]: (state, action) => {
    const selected = state.all[action.id].language;

    return {
      ...state,
      selected,
    };
  },

  [SHOW_DATA]: (state, action) => {
    const shown = state.all.filter((lang) => {
      return lang.language.toUpperCase() === action.data.toUpperCase();
    });

    return {
      ...state,
      shown,
    };
  },

  [HIDE_LIST]: (state, action) => {
    const filtered = action.data;

    return {
      ...state,
      filtered,
    };
  },
}, initialState);

export default languages;
