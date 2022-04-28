const BmtJS = require("@fairdatasociety/bmt-js");
const BeeJS = require("@ethersphere/bee-js");
const ManifestJS = require("@ethersphere/manifest-js");
const fs = require("fs");
console.log(BmtJS);
console.log(BeeJS);
console.log(ManifestJS);

const main = async () => {
  const bee = new BeeJS.Bee("http://api.gateway.ethswarm.org");
  const manifestJs = new ManifestJS.ManifestJs(bee);

  const hackerManifestoAddress =
    "d755aa1e5b2e059f7013dbdd6e1134fbc00976c5254c176a74ef24f1ce60f06f";

  const isManifest = await manifestJs.isManifest(hackerManifestoAddress);
  console.log(isManifest);
  const paths = await manifestJs.getHashes(hackerManifestoAddress);
  console.log(paths);
  const data = await bee.downloadData(
    "50271dc20df9d9acded21bd0f708ee72ad648162637731ab376d6b2fa769f5fe"
  );
  console.log(data);
  
  const chunkedFile = BmtJS.makeChunkedFile(data);
  console.log("file", chunkedFile);
  const leafChunks = chunkedFile.leafChunks();
  leafChunks.forEach((c) => {
    console.log("leafa address", Buffer.from(c.address()).toString("hex"));
    console.log("leafa", Buffer.from(c.span()).readUInt32LE(0))
    console.log("leafa payload utf", Buffer.from(c.payload).toString());
  });
  const span = chunkedFile.span();
  console.log("span", Buffer.from(span).readUInt32LE(0));

  const rootChunk = chunkedFile.rootChunk();
  console.log("root", rootChunk);
  console.log("rootAddress", Buffer.from(rootChunk.address()).toString("hex"));


  let file = await fs.readFileSync( './cyberspace-independence.txt' );
  console.log(file)
  console.log(file.toString())
  const chunkedFile2 = BmtJS.makeChunkedFile(file);
  console.log(chunkedFile2)

  const leafChunks2 = chunkedFile.leafChunks();
  leafChunks2.forEach((c) => {
    console.log("leafa address", Buffer.from(c.address()).toString("hex"));
    console.log("leafa", Buffer.from(c.span()).readUInt32LE(0))
    console.log("leafa payload utf", Buffer.from(c.payload).toString());
  });
  const span2 = chunkedFile.span();
  console.log("span", Buffer.from(span2).readUInt32LE(0));

  const rootChunk2 = chunkedFile2.rootChunk();
  console.log("root", rootChunk2);
  console.log("rootAddress", Buffer.from(rootChunk2.address()).toString("hex"));

};

main();