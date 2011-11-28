<?php /* Index Template */ ?>
<?php get_header(); ?>
	<div id="vcard">
		<h1 id="name">
			Hello, I am Michael.
		</h1>
		<h2 id="title">
			I am a developer. I make things.
		</h2>
		<p class="description">
			I am a software engineer for <a href="http://webfilings.com/" target="_blank">WebFilings</a>, I run quality assurance for <a href="http://8bit.io/" target="_blank">8BIT</a>,
			and I do freelance development for fun, like <a href="http://iowagirleats.com/" target="_blank">Iowa Girl Eats</a>.
		</p>
		<p class="description">
			I am obsessed with code. I never stop learning.
		</p>
		<p class="description">
			Drop me a line if you would like to <a href="mailto:manovotny@gmail.com" title="Email">talk</a>.
		</p>
		<ul id="social">
			<li>
				<a id="social-email" href="mailto:manovotny@gmail.com" title="Email">
					<img src="<?php man_get_image( 'email.png', false, 'social/' ); ?>" alt="Email" />
				</a>
			</li>
			<li>
				<a id="social-twitter" href="http://twitter.com/manovotny" title="Twitter" target="_blank">
					<img src="<?php man_get_image( 'twitter.png', false, 'social/' ); ?>" alt="Twitter" />
				</a>
			</li>
			<li>
				<a id="social-forrst" href="http://forrst.com/people/manovotny" title="Forrst" target="_blank">
					<img src="<?php man_get_image( 'forrst.png', false, 'social/' ); ?>" alt="Forrst" />
				</a>
			</li>
			<li>
				<a id="social-github" href="http://github.com/manovotny" title="GitHub" target="_blank">
					<img src="<?php man_get_image( 'github.png', false, 'social/' ); ?>" alt="GitHub" />
				</a>
			</li>
			<li>
				<a id="social-wordpress" href="http://profiles.wordpress.org/users/manovotny/" title="WordPress" target="_blank">
					<img src="<?php man_get_image( 'wordpress.png', false, 'social/' ); ?>" alt="WordPress" />
				</a>
			</li>
		</ul>
		<div id="copyright">
			<?php man_copyright(); ?>
		</div>
	</div>
<?php get_footer(); ?>