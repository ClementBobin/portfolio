function TechNews() {
  return (
    <main className="sec">
      <div className="blockCustom">
        <div className="tile">
          {/* Title for the technology news section */}
          <h1 className="reminder">Veille technologique</h1>

          {/* Embed Wakelet iframe for displaying technology news */}
          <iframe
            className="wakeletEmbed min-h-[500px]"
            width="100%"
            src="https://embed.wakelet.com/wakes/GPWkoCiThpXFbF7mkRFSL/list?hide-cover=1&hide-description=1&hide-title=1"
            allow="autoplay"
            title="Technology News Wakelet Embed"
          />
        </div>
      </div>
    </main>
  );
}

export default TechNews;