/*eslint-disable react/prop-types*/

import React from 'react';
import PlayViewContainer from './play/PlayViewContainer';
import HighscoreViewContainer from './highscore/HighscoreViewContainer';
import ProfileViewContainer from './profile/ProfileViewContainer';
import TypeViewContainer from './type/TypeViewContainer';
import MultiplayViewContainer from './multiplay/MultiplayViewContainer';
import MultiplayTypeViewContainer from './multiplaytype/MultiplayTypeViewContainer';

/**
 * AppRouter is responsible for mapping a navigator scene to a view
 */
export default function AppRouter(props) {
  const route = props.scene.route;
  const key = route.key;

  if (key === 'Play') {
    return <PlayViewContainer />;
  }

  if (key === 'Highscore') {
    return <HighscoreViewContainer />
  }

  if (key === 'Profile') {
    return <ProfileViewContainer />;
  }

  if (key === 'Type') {
    return <TypeViewContainer />;
  }

  if (key === 'Multiplay') {
    return <MultiplayViewContainer />;
  }

  if (key === 'MultiplayType') {
    return <MultiplayTypeViewContainer />;
  }

  throw new Error('Unknown navigation key: ' + key);
}
