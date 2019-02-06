function showHome(req, res) {
  res.render('pages/home', {
    errors: [],
    info: {},
  });
}

function show404(req, res) {
  req.flash('errors', 'The route you entered does not exist.');

  res.status(404).render('pages/home', {
    errors: req.flash('errors'),
    info: {},
  });
}


module.exports = {
  showHome,
  show404,
};
