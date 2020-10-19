package com.C_Wheel;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.sbugert.rnadmob.RNAdMobPackage;
import com.swmansion.rnscreens.RNScreensPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.horcrux.svg.SvgPackage;
import com.kishanjvaghela.cardview.RNCardViewPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import io.invertase.firebase.database.RNFirebaseDatabasePackage;
import io.invertase.firebase.RNFirebasePackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNAdMobPackage(),
            new RNFirebasePackage(),
            new RNFirebaseDatabasePackage(),
            new RNScreensPackage(),
            new ReactNativeConfigPackage(),
            new SplashScreenReactPackage(),
            new RNI18nPackage(),
            new RNSoundPackage(),
            new AsyncStoragePackage(),
            new SvgPackage(),
            new RNCardViewPackage(),
            new ReanimatedPackage(),
            new VectorIconsPackage(),
            new RNGestureHandlerPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
