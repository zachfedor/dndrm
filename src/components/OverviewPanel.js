import React from 'react';
import { Link } from 'react-router-dom';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ExploreIcon from '@material-ui/icons/Explore';
import GroupIcon from '@material-ui/icons/Group';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import './OverviewPanel.css';


const NavButton = ({ children, to }) => (
  <Link className="Button" to={to}>
    {children}
  </Link>
);

const OverviewPanel = () => {
  return (
    <main className="OverviewPanel">
      <p>
        Welcome to your Dungeons &amp; Dragons Remote Management system, a simple
        way to keep track of your campaigns, character sheets, and combat
        encounters.
      </p>

      <nav>
        <div>
          <NavButton to="/campaigns">
            <ExploreIcon />
            Your Campaigns
          </NavButton>
          <NavButton to="/campaigns/create">
            <AddCircleIcon />
            New Campaign
          </NavButton>
        </div>

        <div>
          <NavButton to="/characters">
            <GroupIcon />
            Your Characters
          </NavButton>
          <NavButton to="/characters/create">
            <PersonAddIcon />
            New Character
          </NavButton>
        </div>
      </nav>
    </main>
  );    
};

export default OverviewPanel;
