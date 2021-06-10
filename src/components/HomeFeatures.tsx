import React from "react";
export const HomeFeatures: React.FC = () => (
  <div id="features">
    <div className="container">
      <div className="text-center">
        <h2>Features</h2>
        <div className="row">
          <div className="col-md-10 offset-md-1">
            <p>StreamingLive provides a means for your church congregation to gather at set times to worship, connect and grow together during your church service.  You can do so regardless of if the service is recorded, or truly live.</p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <ul>
            <li>A fully customizable live streaming page that uses your church's logo and color scheme.</li>
            <li>The ability to include any content you wish by either linking to it from buttons or including it as tabs within the page.</li>
            <li>A built in page-editor to allow you to create simple, embedded tabs for sermon notes, church bulletin information or resource links.</li>
            <li>Managed schedules to automatically switch to your sermon feed at set times.</li>
            <li>Ability to host watch parties for pre-recorded services, with time syncing.</li>
          </ul>
        </div>
        <div className="col-md-6">
          <ul>
            <li>Integrated chat with profanity filtering and moderation to allow your members and visitors to connect to one another.</li>
            <li>A host dashboard to allow church leaders to moderate the chat and communicate to one another in real-time.</li>
            <li>Live callouts to provide useful information along with the service such as verse references, main points, and links to resources, when they are needed.</li>
            <li>The ability for users to connect with host for one-on-one private prayer.</li>
            <li>Completely <a href="https://github.com/LiveChurchSolutions/StreamingLive" target="_blank" rel="noopener noreferrer">open source</a>.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
)
