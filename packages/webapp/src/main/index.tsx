import React from 'react';
import ReactDOM from 'react-dom';
import { RoutedApplication } from './application';
import { setTheme } from './utils/theme-switcher';
import { LocalStorageRepository } from '../main/services/local-storage/local-storage-repository';

import './styles.css';

const themePreference: string | null = LocalStorageRepository.getUserThemePreference();

if (!themePreference) {
 
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    LocalStorageRepository.setSystemThemePreference('dark');
    setTheme('dark');
  } else {
    LocalStorageRepository.setSystemThemePreference('light');
    setTheme('light');
  }
} else {
  setTheme(themePreference);
}

ReactDOM.render(<RoutedApplication />, document.getElementById('root') as HTMLElement);
