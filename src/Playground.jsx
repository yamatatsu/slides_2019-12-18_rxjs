import React from "react";
import scriptLoader from "react-async-script-loader";
// import { Subject, merge } from "rxjs";
// import { scan, mapTo } from "rxjs/operators";

const load = scriptLoader("https://embed.runkit.com");

const inirialCode = `const { Subject } = require('rxjs');
const { map } = require('rxjs/operators');

const subject = new Subject();
subject.subscribe({next:n => console.log(\`[original]: \${n}\`)});
subject.pipe(map(n => n * 2)).subscribe({next:n => console.log(\`[*2]: \${n}\`)});

subject.next(3)
subject.next(10)
`;

// React
export default load(function Demo({ isScriptLoaded }) {
  if (!isScriptLoaded) return <p>Loading...</p>;

  const Embed = require("react-runkit");
  return (
    <div style={{ width: "80vw" }}>
      <Embed source={inirialCode} nodeVersion="12" />
    </div>
  );
});
