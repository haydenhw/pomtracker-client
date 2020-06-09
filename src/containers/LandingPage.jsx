import React from 'react';

import { useHistory } from "react-router-dom";

import LandingDescriptionList from '../components/LandingDescriptionList';
import LandingHeading from '../components/LandingHeading';
import LandingScreenshot from '../components/LandingScreenshot';
import LandingSections from '../components/LandingSections';
import {routeToTimerPage} from "../helpers/route";

const landingCopy = [
  {
    title: 'Projects and Tasks',
    description: 'Supports projects with nested tasks',
  },
  {
    title: 'Fun to Use',
    description: 'Quirky animiations keep things light',
  },
  {
    title: 'Minimal Design',
    description: 'Clean, simple, easy to use interface',
  },
];

export default function LandingPage() {
  const history = useHistory();
  const routeToApp = () => { routeToTimerPage(history) };
  return (
    <div className="landing-page row">
      <div className="col7 col-lp-hero">
        <div className="lp-hero">
          <LandingHeading handleStartClick={routeToApp} />
          <LandingDescriptionList copy={landingCopy} handleStartClick={routeToApp} />
        </div>
      </div>
      <div className="col5">
        <LandingScreenshot />
        <LandingSections copy={landingCopy} />
      </div>
    </div>

  );
}
