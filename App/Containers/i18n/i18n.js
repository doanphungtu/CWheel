import I18n from 'react-native-i18n';

import us from './locales/us';
import vn from './locales/vn';

I18n.fallbacks = true;
I18n.translations = {
  us,
  vn
};

export default I18n;