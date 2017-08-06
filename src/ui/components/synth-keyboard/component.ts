import Component from '@glimmer/component';

interface IKey {
  name: string;
  octave: number;
  color: string;
  indent: boolean;
  shortcut: string;
}

export default class SynthKeyboard extends Component {
  public keys: IKey[] = [
    {
      color: 'white',
      indent: true,
      name: 'c',
      octave: 4,
      shortcut: 'a',
    },
    {
      color: 'black',
      indent: false,
      name: 'c#',
      octave: 4,
      shortcut: 'q',
    },
    {
      color: 'white',
      indent: true,
      name: 'd',
      octave: 4,
      shortcut: 's',
    },
    {
      color: 'black',
      indent: false,
      name: 'd#',
      octave: 4,
      shortcut: 'w',
    },
    {
      color: 'white',
      indent: true,
      name: 'e',
      octave: 4,
      shortcut: 'd',
    },
    {
      color: 'white',
      indent: false,
      name: 'f',
      octave: 4,
      shortcut: 'f',
    },
    {
      color: 'black',
      indent: false,
      name: 'f#',
      octave: 4,
      shortcut: 'e',
    },
    {
      color: 'white',
      indent: true,
      name: 'g',
      octave: 4,
      shortcut: 'g',
    },
    {
      color: 'black',
      indent: false,
      name: 'g#',
      octave: 4,
      shortcut: 'r',
    },
    {
      color: 'white',
      indent: true,
      name: 'a',
      octave: 4,
      shortcut: 'h',
    },
    {
      color: 'black',
      indent: false,
      name: 'a#',
      octave: 4,
      shortcut: 't',
    },
    {
      color: 'white',
      indent: true,
      name: 'b',
      octave: 4,
      shortcut: 'j',
    },
    {
      color: 'white',
      indent: false,
      name: 'c',
      octave: 5,
      shortcut: 'k',
    },
    {
      color: 'black',
      indent: false,
      name: 'c#',
      octave: 5,
      shortcut: 'y',
    },
    {
      color: 'white',
      indent: true,
      name: 'd',
      octave: 5,
      shortcut: 'l',
    },
    {
      color: 'black',
      indent: false,
      name: 'd#',
      octave: 5,
      shortcut: 'u',
    },
    {
      color: 'white',
      indent: true,
      name: 'e',
      octave: 5,
      shortcut: ';',
    },
    {
      color: 'white',
      indent: false,
      name: 'f',
      octave: 5,
      shortcut: `'`,
    },
    {
      color: 'black',
      indent: false,
      name: 'f#',
      octave: 5,
      shortcut: 'i',
    },
    {
      color: 'white',
      indent: true,
      name: 'g',
      octave: 5,
      shortcut: '`',
    },
    {
      color: 'black',
      indent: false,
      name: 'g#',
      octave: 5,
      shortcut: 'o',
    },
    {
      color: 'white',
      indent: true,
      name: 'a',
      octave: 5,
      shortcut: 'z',
    },
    {
      color: 'black',
      indent: false,
      name: 'a#',
      octave: 5,
      shortcut: 'p',
    },
    {
      color: 'white',
      indent: true,
      name: 'b',
      octave: 5,
      shortcut: 'x',
    },
    {
      color: 'white',
      indent: false,
      name: 'c',
      octave: 6,
      shortcut: 'c',
    },
    {
      color: 'black',
      indent: false,
      name: 'c#',
      octave: 6,
      shortcut: '[',
    },
    {
      color: 'white',
      indent: true,
      name: 'd',
      octave: 6,
      shortcut: 'v',
    },
  ];
}
