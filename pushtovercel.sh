if [ -z "$1" ]
  then
	echo "No commit message supplied"
	exit 1
fi
npm run build && git add . && git commit -m "$1" && git push