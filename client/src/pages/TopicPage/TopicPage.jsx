import React, { useEffect, useState } from "react";

import TopicList from "../../widgets/TopicList/TopicList";

function TopicPage({ user }) {
  return (
    <div>
      <TopicList user={user} />
    </div>
  );
}

export default TopicPage;
