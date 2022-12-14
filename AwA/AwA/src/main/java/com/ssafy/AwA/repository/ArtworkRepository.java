package com.ssafy.AwA.repository;

import com.ssafy.AwA.domain.artwork.Artwork;
import com.ssafy.AwA.domain.profile.Profile;
import com.ssafy.AwA.domain.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.time.LocalDateTime;
@Repository

public interface ArtworkRepository extends JpaRepository<Artwork, Long> {

    @Query("select a from Artwork a where a.artwork_id=:artwork_id")
    Artwork findByArtwork_id(@Param("artwork_id") Long artwork_id);

//    Artwork findByArtwork_id(Long artwork_id);

    @Query("select a from Artwork a ORDER BY a.artwork_id DESC")
    List<Artwork> findAllByOrderByArtwork_idDesc();

    @Query("select a from Artwork a where a.sell_user=:sell_user")
    List<Artwork> findAllBySell_user(@Param("sell_user") User sell_user);

    @Query("select a from Artwork a")
    Page<Artwork> findAll(Pageable pageable);

    @Query("select a from Artwork a where a.sell_user=:sell_user")
    Page<Artwork> findAllBySell_userPage(Pageable pageable, @Param("sell_user") User sell_user);



    @Query("select a from Artwork a where a.sell_user<>:sell_user and (a.artwork_id NOT IN (SELECT l.artwork from Likes l where l.profile =:profile1) and a.artwork_id NOT IN  (SELECT c.parent_artwork From Comment c where c.profile=:profile2))")
    List<Artwork> findNotLikeAndCommentArtworks(@Param("sell_user") User sell_user, @Param("profile1") Profile profile, @Param("profile2") Profile profile2);

    @Query("select a from Artwork a where a.sell_user<>:sell_user")
    List<Artwork> findExceptMyArtworks(@Param("sell_user") User sell_user);

}
