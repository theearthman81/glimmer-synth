import Component from '@glimmer/component';

interface Key {
  name: string;
  octave: number;
  color: string;
  indent: boolean;
  shortcut: string;
}

export default class SynthKeyboard extends Component {
  keys: Array<Key> = [
    {
      name: 'c',
      octave: 4,
      color: 'white',
      indent: true,
      shortcut: 'a',
    },
    {
      name: 'c#',
      octave: 4,
      color: 'black',
      indent: false,
      shortcut: 'q',
    },
    {
      name: 'd',
      octave: 4,
      color: 'white',
      indent: true,
      shortcut: 's',
    },
    {
      name: 'd#',
      octave: 4,
      color: 'black',
      indent: false,
      shortcut: 'w',
    },
    {
      name: 'e',
      octave: 4,
      color: 'white',
      indent: true,
      shortcut: 'd',
    },
    {
      name: 'f',
      octave: 4,
      color: 'white',
      indent: false,
      shortcut: 'f',
    },
    {
      name: 'f#',
      octave: 4,
      color: 'black',
      indent: false,
      shortcut: 'e',
    },
    {
      name: 'g',
      octave: 4,
      color: 'white',
      indent: true,
      shortcut: 'g',
    },
    {
      name: 'g#',
      octave: 4,
      color: 'black',
      indent: false,
      shortcut: 'r',
    },
    {
      name: 'a',
      octave: 4,
      color: 'white',
      indent: true,
      shortcut: 'h',
    },
    {
      name: 'a#',
      octave: 4,
      color: 'black',
      indent: false,
      shortcut: 't',
    },
    {
      name: 'b',
      octave: 4,
      color: 'white',
      indent: true,
      shortcut: 'j',
    },
    {
      name: 'c',
      octave: 5,
      color: 'white',
      indent: false,
      shortcut: 'k',
    },
    {
      name: 'c#',
      octave: 5,
      color: 'black',
      indent: false,
      shortcut: 'y',
    },
    {
      name: 'd',
      octave: 5,
      color: 'white',
      indent: true,
      shortcut: 'l',
    },
    {
      name: 'd#',
      octave: 5,
      color: 'black',
      indent: false,
      shortcut: 'u',
    },
    {
      name: 'e',
      octave: 5,
      color: 'white',
      indent: true,
      shortcut: ';',
    },
    {
      name: 'f',
      octave: 5,
      color: 'white',
      indent: false,
      shortcut: `'`,
    },
    {
      name: 'f#',
      octave: 5,
      color: 'black',
      indent: false,
      shortcut: 'i',
    },
    {
      name: 'g',
      octave: 5,
      color: 'white',
      indent: true,
      shortcut: '`',
    },
    {
      name: 'g#',
      octave: 5,
      color: 'black',
      indent: false,
      shortcut: 'o',
    },
    {
      name: 'a',
      octave: 5,
      color: 'white',
      indent: true,
      shortcut: 'z',
    },
    {
      name: 'a#',
      octave: 5,
      color: 'black',
      indent: false,
      shortcut: 'p',
    },
    {
      name: 'b',
      octave: 5,
      color: 'white',
      indent: true,
      shortcut: 'x',
    },
    {
      name: 'c',
      octave: 6,
      color: 'white',
      indent: false,
      shortcut: 'c',
    },
    {
      name: 'c#',
      octave: 6,
      color: 'black',
      indent: false,
      shortcut: '[',
    },
    {
      name: 'd',
      octave: 6,
      color: 'white',
      indent: true,
      shortcut: 'v',
    },
  ];
}
