from storages.backends.s3boto import S3BotoStorage

class MediaRootS3BotoStorage(S3BotoStorage):
	location = 'media'