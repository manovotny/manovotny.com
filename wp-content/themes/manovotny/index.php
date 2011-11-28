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
				<a href="mailto:manovotny@gmail.com" title="Email">
					<img src="<?php man_get_image( 'social-email.png' ); ?>" alt="Email" />
				</a>
			</li>
			<li>
				<a href="http://twitter.com/manovotny" title="Twitter" target="_blank">
					<img src="<?php man_get_image( 'social-twitter.png' ); ?>" alt="Twitter" />
				</a>
			</li>
			<li>
				<a href="http://forrst.com/people/manovotny" title="Forrst" target="_blank">
					<img src="<?php man_get_image( 'social-forrst.png' ); ?>" alt="Forrst" />
				</a>
			</li>
			<li>
				<a href="http://github.com/manovotny" title="GitHub" target="_blank">
					<img src="<?php man_get_image( 'social-github.png' ); ?>" alt="GitHub" />
				</a>
			</li>
			<li>
				<a href="http://profiles.wordpress.org/users/manovotny/" title="WordPress" target="_blank">
					<img src="<?php man_get_image( 'social-wordpress.png' ); ?>" alt="WordPress" />
				</a>
			</li>
		</ul>
		<div id="copyright">
			<?php man_copyright(); ?>
		</div>
	</div>
<?php get_footer(); ?>