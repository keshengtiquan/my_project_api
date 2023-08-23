import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Auth } from '../auth/decorators/auth.decorators';
import { QueryPostListDto } from './dto/query-post-list.dto';
import { CurrentUser } from '@/decorators/user.decorator';
import { User } from '../user/entities/user.entity';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {
  }

  @Post('/create')
  @Auth()
  create(@Body() createPostDto: CreatePostDto, @CurrentUser() user: User) {
    return this.postService.create(createPostDto, user);
  }

  @Get('/getlist')
  @Auth()
  findAll(
    @Query() queryPostListDto: QueryPostListDto,
    @CurrentUser() user: User,
  ) {


    return this.postService.findAll(queryPostListDto, user);
  }

  @Get('/get')
  @Auth()
  findOne(@Query('post_id') post_id: string, @CurrentUser() user: User) {
    return this.postService.findOne(+post_id, user);
  }

  @Post('/update')
  @Auth()
  update(@Body() updatePostDto: UpdatePostDto, @CurrentUser() user: User) {
    return this.postService.update(updatePostDto, user);
  }

  @Post('/delete')
  @Auth()
  remove(@Body() post_id: { post_id: string }) {
    return this.postService.remove(post_id.post_id );
  }
}
