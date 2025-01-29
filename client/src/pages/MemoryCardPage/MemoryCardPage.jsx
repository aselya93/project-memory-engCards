import React from "react";
import MemoryCardList from "../../widgets/MemoryCardList/MemoryCardList";

function MemoryCardPage({user}) {
  return (
    <div>
      <MemoryCardList user={user} />
    </div>
  );
}

export default MemoryCardPage;
