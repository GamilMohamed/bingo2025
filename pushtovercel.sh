git status

if [ -z "$1" ]
  then
	echo "No commit message supplied"
	exit 1
fi

read -p "Are you sure you want to push to Vercel? (y/n) " -n 1
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
	echo "Pushing to Vercel"
else
	echo "Exiting"
	exit 1
fi
npm run build && git add . && git commit -m "$*" && git push