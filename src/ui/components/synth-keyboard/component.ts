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
      shortcut: 'q',
    },
    {
      name: 'c#',
      octave: 4,
      color: 'black',
      indent: false,
      shortcut: 'w',
    },
    {
      name: 'd',
      octave: 4,
      color: 'white',
      indent: true,
      shortcut: 'e',
    },
    {
      name: 'd#',
      octave: 4,
      color: 'black',
      indent: false,
      shortcut: 'r',
    },
    {
      name: 'e',
      octave: 4,
      color: 'white',
      indent: true,
      shortcut: 't',
    },
    {
      name: 'f',
      octave: 4,
      color: 'white',
      indent: false,
      shortcut: 'y',
    },
    {
      name: 'f#',
      octave: 4,
      color: 'black',
      indent: false,
      shortcut: 'u',
    },
    {
      name: 'g',
      octave: 4,
      color: 'white',
      indent: true,
      shortcut: 'i',
    },
    {
      name: 'g#',
      octave: 4,
      color: 'black',
      indent: false,
      shortcut: 'o',
    },
    {
      name: 'a',
      octave: 4,
      color: 'white',
      indent: true,
      shortcut: 'p',
    },
    {
      name: 'a#',
      octave: 4,
      color: 'black',
      indent: false,
      shortcut: 'a',
    },
    {
      name: 'b',
      octave: 4,
      color: 'white',
      indent: true,
      shortcut: 's',
    },
    {
      name: 'c',
      octave: 5,
      color: 'white',
      indent: false,
      shortcut: 'd',
    },
    {
      name: 'c#',
      octave: 5,
      color: 'black',
      indent: false,
      shortcut: 'f',
    },
    {
      name: 'd',
      octave: 5,
      color: 'white',
      indent: true,
      shortcut: 'g',
    },
    {
      name: 'd#',
      octave: 5,
      color: 'black',
      indent: false,
      shortcut: 'h',
    },
    {
      name: 'e',
      octave: 5,
      color: 'white',
      indent: true,
      shortcut: 'j',
    },
    {
      name: 'f',
      octave: 5,
      color: 'white',
      indent: false,
      shortcut: 'k',
    },
    {
      name: 'f#',
      octave: 5,
      color: 'black',
      indent: false,
      shortcut: 'l',
    },
    {
      name: 'g',
      octave: 5,
      color: 'white',
      indent: true,
      shortcut: 'z',
    },
    {
      name: 'g#',
      octave: 5,
      color: 'black',
      indent: false,
      shortcut: 'x',
    },
    {
      name: 'a',
      octave: 5,
      color: 'white',
      indent: true,
      shortcut: 'c',
    },
    {
      name: 'a#',
      octave: 5,
      color: 'black',
      indent: false,
      shortcut: 'v',
    },
    {
      name: 'b',
      octave: 5,
      color: 'white',
      indent: true,
      shortcut: 'b',
    },
    {
      name: 'c',
      octave: 6,
      color: 'white',
      indent: false,
      shortcut: 'n',
    },
    {
      name: 'c#',
      octave: 6,
      color: 'black',
      indent: false,
      shortcut: 'm',
    },
    {
      name: 'd',
      octave: 6,
      color: 'white',
      indent: true,
      shortcut: ',',
    },
  ];
}
