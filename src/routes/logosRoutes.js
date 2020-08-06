
const router = require('express').Router();
const {deleteLogo, updateLogo, createLogo, getLogos} = require('../database/logos');

router.get('/', async (req, res) => {
  res.send(await getLogos());
});

// logic for post command to work
router.post('/', async (apiRequest, apiResponse) => {
  const newLogo = apiRequest.body;
  await createLogo(newLogo);
  apiResponse.send({
    message:'New logo created.',
    allLogos: await getLogos(),
    thanks: true
  });
});


module.exports = router;
