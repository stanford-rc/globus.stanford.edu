# coding: utf-8

Gem::Specification.new do |spec|
  spec.name          = "jekyll-theme-stanford-lagunita"
  spec.version       = "201509181"
  spec.authors       = ["A. Karl Kornel"]
  spec.email         = ["akkornel@stanford.edu"]

  spec.summary       = %q{Stanford's Lagunita web site theme, in Jekyll form.}
  spec.homepage      = "https://github.com/akkornel/lagunita"
  spec.license       = "Proprietary"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r{^(assets|_layouts|_includes|_sass|LICENSE|README)}i) }

  spec.add_runtime_dependency "jekyll", "~> 3.6"
  sped.add_runtime_dependency "jekyll-paginate"

  spec.add_development_dependency "bundler", "~> 1.12"
  spec.add_development_dependency "rake", "~> 12.3.3"
end
