var feed = new Instafeed({
    clientId: "467ede5a6b9b48ae8e03f4e2582aeeb3",
    get: "user",
    userId: "510446258", //http://jelled.com/instagram/lookup-user-id#
    limit: 18,
    target: "feed",
    resolution: "low_resolution"
});
feed.run();
