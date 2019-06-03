import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const defaultContext = {
  translate: jest.fn(),
  languages: [],
  defaultLanguage: 'en',
  activeLanguage: { code: 'en', active: true },
  initialize: jest.fn(),
  addTranslation: jest.fn(),
  addTranslationForLanguage: jest.fn(),
  setActiveLanguage: jest.fn()
};

const getWithLocalizeWithContext = () => {
  jest.doMock('../src/LocalizeContext', () => {
    return {
      LocalizeContext: {
        Consumer: (props) => props.children(defaultContext)
      }
    }
  });

  return require('withLocalize').withLocalize;
};

describe('useTranslate', () => {
  it('should enable getting LocalizeContext props from useTranslate', () => {
    const Component = props => {
      const {initialize, translate, addTranslationForLanguage} = useTranslate();
      initialize({
        languages: [{ name: 'language', code: 'xx' }],
        options: { renderToStaticMarkup, defaultLanguage: 'xx' },
      });
      addTranslationForLanguage({'tes1':'Welcome'},'xx');
      return (
        <h1>{translate('test1')}</h1>
      );
    }

    const result = shallow(<Wrapped />);
    const wrapper = result.dive();
    //Todo test is compiled code is <h1>Welcome</h1>
  });


});
