# coding: utf-8

Gem::Specification.new do |spec|
  spec.name          = "jekyll-theme-stanford-decanter"
  spec.version       = "1.0"
  spec.authors       = ["Sara Cook"]
  spec.email         = ["saracook@stanford.edu"]

  spec.summary       = %q{Stanford's Lagunita web site theme, in Jekyll form.}
  spec.homepage      = "https://github.com/akkornel/lagunita"
  spec.license       = "Proprietary"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r{^(assets|_layouts|_includes|_sass|LICENSE|README)}i) }

  spec.add_runtime_dependency "jekyll", "~> 3.9"
  spec.add_runtime_dependency "jekyll-paginate"

  spec.add_development_dependency "bundler", "~> 2.3"
  spec.add_development_dependency "rake", "~> 13.0"
end
