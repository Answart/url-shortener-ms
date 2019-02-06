function showHome(req, res) {
  res.render('pages/home', { errors: [] });
}

function show404(req, res) {
  req.flash('errors', 'The route you entered does not exist.');

  res.status(404).render('pages/home', {
    errors: req.flash('errors'),
  });
}


module.exports = {
  showHome,
  show404,
};
