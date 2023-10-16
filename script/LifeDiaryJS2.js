
  var pagess = document.getElementsByClassName('page');
  for(var i = 0; i < pagess.length; i++)
  {
    var page = pagess[i];
    if (i % 2 === 0)
    {
      page.style.zIndex = (pagess.length - i);
    }
  }

  document.addEventListener('DOMContentLoaded', function(){
	for(var i = 0; i < pagess.length; i++)
	{
	  //Or var page = pages[i];
	  pagess[i].pageNum = i + 1;
	  pagess[i].onclick=function()
	  {
		  console.log(this.pageNum);
		if (this.pageNum % 2 === 0)
		{
		  this.classList.remove('flipped');
		  this.previousElementSibling.classList.remove('flipped');
		}
		else
		{
		  this.classList.add('flipped');
		  this.nextElementSibling.classList.add('flipped');
		}
	  }
	}
  })