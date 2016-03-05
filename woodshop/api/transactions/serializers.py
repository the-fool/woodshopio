

class TransactionSerializer(serializers.ModelSerializer):
    author = UserSerializer(required=False)
    categories = CategorySerializer(many=True, required=False)
    pictures = serializers.HyperlinkedIdentityField(view_name='gempicture-list')
    main_picture = PictureSerializer()

    def get_validation_exclusions(self, *args, **kwargs):
    	# I don't know what this is for -- it's copied from a tutorial
        # Need to exclude `user` since we'll add that later based off the request
        exclusions = super(GemSerializer, self).get_validation_exclusions(*args, **kwargs)
        return exclusions + ['author']

    class Meta:
        model = Gem