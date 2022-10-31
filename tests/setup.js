import Enzyme from 'enzyme';
import jsdom from 'jsdom';

const Adapter = require('@wojtekmaj/enzyme-adapter-react-17');

const { JSDOM } = jsdom;
const { window } = new JSDOM('');
const { document } = new JSDOM('').window;

global.document = document;
global.window = window;

Enzyme.configure({ adapter: new Adapter() });
