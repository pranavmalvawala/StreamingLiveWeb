import React from "react";
export const HomeBenefits: React.FC = () => {
    return (
        <div id="benefits">
            <div className="container">
                <div className="text-center">
                    <h2>How <span>Streaming Live</span> Can Help Your Church</h2>
                    <p style={{ marginTop: 20 }} className="lead">During this time when many churches cannot meet physically, connection is more important than ever.  It's not enough to simply offer your service via video.  Members need a way to connect with each other and feel the support of the congregation.</p>
                </div>
                <hr style={{ marginTop: 30, marginBottom: 30 }} />
                <div className="row">
                    <div className="col-md-6">
                        <p>By live streaming your church service at set times, you can still engage with your members as well as providing a time to connect with one another via chat and prayer requests.</p>
                        <p><a href="/">StreamingLive.church</a> is a wrapper to go around your live or prerecorded videos on YouTube, Vimeo, Facebook, or other platforms.  It provides helpful tools such as chat, prayer, sermon outlines, links to key resources, as well as providing an easy means of scheduling your services.</p>
                        <p>The appearance of your platform is fully customizable and the service is completely free.</p>
                    </div>
                    <div className="col-md-6">
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/HC0B3hHdRew" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen frameBorder="0" title="iframe"></iframe>
                    </div>
                </div>

            </div>
        </div>
    );
}
